import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      {/* Constrain to mobile width */}
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">
        {/* Hero image */}
        <div
          className="flex-1 flex flex-col justify-end pb-16 px-6 relative"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.52)' }} />

          {/* Content above overlay */}
          <div className="relative z-10">
            {/* Logo + tagline */}
            <div className="mb-12">
              <h1
                className="text-white font-bold tracking-widest"
                style={{ fontSize: '3.75rem', lineHeight: 1.1 }}
              >
                STaQ
              </h1>
              <p
                className="font-semibold mt-1 tracking-wider uppercase"
                style={{ color: '#fbbf24', fontSize: '1.125rem' }}
              >
                Self Travel &amp; Quest
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Turn every city into an adventure. Explore, discover, and earn rewards.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/register"
                className="block rounded-2xl py-4 text-center font-bold text-white text-base tracking-wide transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: '#f59e0b' }}
              >
                Start Exploring
              </Link>

              <Link
                href="/login"
                className="block rounded-2xl py-4 text-center font-semibold text-white text-base transition-opacity hover:opacity-90 active:opacity-80"
                style={{ border: '1px solid rgba(255,255,255,0.4)' }}
              >
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
