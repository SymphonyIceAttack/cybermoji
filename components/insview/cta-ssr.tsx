export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Ready to Go</span>
            <br />
            <span className="gradient-text-cyan">Dark Web?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join over 1 million users who trust duckinsview for secure,
            anonymous Instagram access. No registration. No tracking. Complete
            anonymity guaranteed.
          </p>
          <a
            href="#search"
            className="inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-primary-foreground bg-primary/20 border border-primary/50 hover:bg-primary/30 hover:border-primary transition-all duration-300 clip-path-polygon"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
            }}
          >
            Initialize Protocol
          </a>
          <p className="mt-6 text-sm font-mono text-muted-foreground">
            No credentials required - access immediately
          </p>
        </div>
      </div>
    </section>
  );
}
