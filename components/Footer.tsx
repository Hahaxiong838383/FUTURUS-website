export default function Footer() {
  return (
    <footer className="relative border-t border-charcoal-900/10 bg-cream-100 pb-10 pt-20 md:pt-28">
      <div className="mx-auto max-w-[1680px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 border-b border-charcoal-900/10 pb-16">
          <div className="col-span-12 md:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
              Futurus Studio S.R.L.
            </p>
            <p className="mt-6 max-w-[40ch] font-display text-[clamp(1.5rem,2.2vw,2.25rem)] font-light leading-tight tracking-display-tight">
              Via delle Sette Chiese 94, Roma · 47 Mercer Street, New York.
            </p>
          </div>
          <div className="col-span-6 md:col-span-2 md:col-start-9">
            <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
              Directory
            </p>
            <ul className="mt-6 space-y-2 font-sans text-[13px] text-charcoal-900/80">
              <li><a className="hover:text-charcoal-900" href="#index">Research</a></li>
              <li><a className="hover:text-charcoal-900" href="#work">Work</a></li>
              <li><a className="hover:text-charcoal-900" href="#manifesto">Studio</a></li>
              <li><a className="hover:text-charcoal-900" href="#dispatch">Dispatch</a></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
              Elsewhere
            </p>
            <ul className="mt-6 space-y-2 font-sans text-[13px] text-charcoal-900/80">
              <li><a className="hover:text-charcoal-900" href="#">Field Journal</a></li>
              <li><a className="hover:text-charcoal-900" href="#">Github</a></li>
              <li><a className="hover:text-charcoal-900" href="#">arXiv profile</a></li>
              <li><a className="hover:text-charcoal-900" href="#">Spotify — field recordings</a></li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark — editorial closing gesture */}
        <div className="mt-16 select-none overflow-hidden">
          <p className="font-display text-[clamp(4rem,20vw,22rem)] font-light leading-[0.8] tracking-[-0.055em] text-charcoal-900">
            Futurus<span className="text-ochre">.</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500 md:flex-row md:items-center md:justify-between">
          <span>© MMXXVI Futurus Studio · All rights reserved</span>
          <span>Colophon · Fraunces &nbsp;×&nbsp; Geist · Built in Rome and Seattle</span>
          <span>+39 06 4742 1928</span>
        </div>
      </div>
    </footer>
  );
}
