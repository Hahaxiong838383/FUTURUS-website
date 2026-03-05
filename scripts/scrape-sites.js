/**
 * Run this script locally:
 *   npm install playwright
 *   npx playwright install chromium
 *   node scripts/scrape-sites.js
 *
 * It will output a JSON file with full site structure for both websites.
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "../scrape-output");

async function scrapeSite(browser, url, name) {
  console.log(`\n=== Scraping ${name}: ${url} ===`);
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: "zh-CN",
  });
  const page = await context.newPage();

  // Collect network requests (CSS, JS, images)
  const resources = { css: [], js: [], images: [], fonts: [] };
  page.on("response", async (response) => {
    const url = response.url();
    const type = response.request().resourceType();
    if (type === "stylesheet") resources.css.push(url);
    else if (type === "script") resources.js.push(url);
    else if (type === "image") resources.images.push(url);
    else if (type === "font") resources.fonts.push(url);
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(3000); // Wait for animations to initialize

  // Take full page screenshot
  const screenshotDir = path.join(OUTPUT_DIR, name);
  fs.mkdirSync(screenshotDir, { recursive: true });
  await page.screenshot({
    path: path.join(screenshotDir, "full-page.png"),
    fullPage: true,
  });
  console.log("  Screenshot saved");

  // Take viewport screenshot
  await page.screenshot({
    path: path.join(screenshotDir, "viewport.png"),
  });

  // Extract page structure
  const structure = await page.evaluate(() => {
    // Helper to get computed styles
    function getAnimationInfo(el) {
      const computed = window.getComputedStyle(el);
      const result = {};
      if (computed.animation && computed.animation !== "none")
        result.animation = computed.animation;
      if (computed.transition && computed.transition !== "all 0s ease 0s")
        result.transition = computed.transition;
      if (computed.transform && computed.transform !== "none")
        result.transform = computed.transform;
      if (computed.opacity !== "1") result.opacity = computed.opacity;
      if (computed.willChange && computed.willChange !== "auto")
        result.willChange = computed.willChange;
      return Object.keys(result).length > 0 ? result : null;
    }

    // Extract section structure
    function extractSection(el, depth = 0) {
      if (depth > 5) return null;
      const tag = el.tagName?.toLowerCase();
      if (!tag || ["script", "style", "link", "meta", "noscript"].includes(tag))
        return null;

      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const info = {
        tag,
        classes: el.className?.toString().split(" ").filter(Boolean).slice(0, 10) || [],
        id: el.id || undefined,
        text: el.children.length === 0 ? el.textContent?.trim().slice(0, 200) : undefined,
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        },
        styles: {
          display: computed.display,
          position: computed.position !== "static" ? computed.position : undefined,
          background: computed.background?.includes("url") || computed.background?.includes("gradient")
            ? computed.background.slice(0, 300)
            : undefined,
          overflow: computed.overflow !== "visible" ? computed.overflow : undefined,
        },
        animation: getAnimationInfo(el),
      };

      // Clean up undefined values
      Object.keys(info.styles).forEach(
        (k) => info.styles[k] === undefined && delete info.styles[k]
      );
      Object.keys(info).forEach(
        (k) => info[k] === undefined && delete info[k]
      );
      if (Object.keys(info.styles).length === 0) delete info.styles;

      // Get children
      const children = [];
      for (const child of el.children) {
        const childInfo = extractSection(child, depth + 1);
        if (childInfo) children.push(childInfo);
      }
      if (children.length > 0) info.children = children;

      return info;
    }

    // Get all sections/major blocks
    const body = document.body;
    const nav = document.querySelector("nav, header, [class*='nav'], [class*='header']");
    const sections = document.querySelectorAll("section, [class*='section'], [class*='block'], [class*='module']");
    const footer = document.querySelector("footer, [class*='footer']");

    // Extract all CSS animation keyframes from stylesheets
    const keyframes = [];
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.type === CSSRule.KEYFRAMES_RULE) {
              keyframes.push({
                name: rule.name,
                css: rule.cssText.slice(0, 500),
              });
            }
          }
        } catch (e) {}
      }
    } catch (e) {}

    // Check for animation libraries
    const libs = {
      gsap: !!window.gsap,
      ScrollTrigger: !!window.ScrollTrigger,
      anime: !!window.anime,
      AOS: !!window.AOS,
      swiper: !!window.Swiper,
      locomotive: !!window.LocomotiveScroll,
      lenis: !!window.Lenis,
      jQuery: !!window.jQuery,
      threeJS: !!window.THREE,
    };

    // Page dimensions
    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    // All images with src
    const images = [...document.querySelectorAll("img")].map((img) => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
    }));

    // All videos
    const videos = [...document.querySelectorAll("video")].map((v) => ({
      src: v.src || v.querySelector("source")?.src,
      poster: v.poster,
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted,
    }));

    // Color palette from computed styles
    const colors = new Set();
    document.querySelectorAll("*").forEach((el) => {
      const cs = window.getComputedStyle(el);
      if (cs.color) colors.add(cs.color);
      if (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)")
        colors.add(cs.backgroundColor);
    });

    // Fonts
    const fonts = new Set();
    document.querySelectorAll("*").forEach((el) => {
      fonts.add(window.getComputedStyle(el).fontFamily);
    });

    return {
      title: document.title,
      pageHeight,
      libs,
      nav: nav ? extractSection(nav) : null,
      sections: [...sections].map((s) => extractSection(s)),
      footer: footer ? extractSection(footer) : null,
      bodyStructure: extractSection(body, 0),
      keyframes,
      images: images.slice(0, 50),
      videos,
      colors: [...colors].slice(0, 30),
      fonts: [...fonts].slice(0, 10),
    };
  });

  // Scroll down and take screenshots at each section
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = 1080;
  let scrollY = 0;
  let sectionIndex = 0;

  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(800); // Wait for scroll animations
    await page.screenshot({
      path: path.join(screenshotDir, `section-${sectionIndex}.png`),
    });
    scrollY += viewportHeight * 0.8;
    sectionIndex++;
    if (sectionIndex > 20) break; // Safety limit
  }
  console.log(`  ${sectionIndex} section screenshots saved`);

  // Extract all inline styles and CSS for animations
  const allCSS = await page.evaluate(() => {
    const cssTexts = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.cssText;
          if (
            text.includes("animation") ||
            text.includes("transition") ||
            text.includes("transform") ||
            text.includes("keyframe") ||
            text.includes("opacity") ||
            text.includes("translate") ||
            text.includes("scale") ||
            text.includes("rotate")
          ) {
            cssTexts.push(text.slice(0, 500));
          }
        }
      } catch (e) {}
    }
    return cssTexts;
  });

  // Get full HTML source
  const html = await page.content();

  // Extract data attributes related to animations
  const dataAttrs = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll("[data-aos], [data-scroll], [data-speed], [data-animate], [data-gsap], [data-parallax]").forEach((el) => {
      const attrs = {};
      for (const attr of el.attributes) {
        if (attr.name.startsWith("data-")) {
          attrs[attr.name] = attr.value;
        }
      }
      results.push({
        tag: el.tagName.toLowerCase(),
        classes: el.className?.toString().slice(0, 100),
        attrs,
      });
    });
    return results;
  });

  await context.close();

  return {
    url,
    name,
    structure,
    resources,
    animationCSS: allCSS.slice(0, 100),
    dataAttrs,
    htmlLength: html.length,
  };
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  try {
    // Scrape reference site
    const refData = await scrapeSite(
      browser,
      "https://www.cndagri.com/",
      "cndagri"
    );

    // Also scrape Chinese version
    const refDataCN = await scrapeSite(
      browser,
      "https://www.cndagri.com/cn/",
      "cndagri-cn"
    );

    // Scrape FUTURUS site for content/images
    const futurusData = await scrapeSite(
      browser,
      "https://www.futurus.co/",
      "futurus"
    );

    // Save results
    const output = {
      scrapedAt: new Date().toISOString(),
      reference: refData,
      referenceCN: refDataCN,
      futurus: futurusData,
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, "site-analysis.json"),
      JSON.stringify(output, null, 2)
    );

    console.log(`\n=== Done! ===`);
    console.log(`Output saved to: ${OUTPUT_DIR}/site-analysis.json`);
    console.log(`Screenshots saved to: ${OUTPUT_DIR}/cndagri/ and ${OUTPUT_DIR}/futurus/`);
    console.log(`\nPlease share the site-analysis.json file content back.`);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
