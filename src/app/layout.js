import localFont from 'next/font/local';
import Shell from '@/components/Shell/Shell';
import './globals.css';
const sans = localFont({
  src: './fonts/geist.woff2',
  variable: '--font-geist-sans',
  display: 'swap',
});
const mono = localFont({
  src: './fonts/geist-mono.woff2',
  variable: '--font-geist-mono',
  display: 'swap',
});
const origin = 'https://ram-pandey.auroradog65.chatgpt.site';
export const metadata = {
  metadataBase: new URL(origin),
  title: { default: 'Ram Pandey — Senior Software Engineer', template: '%s | Ram Pandey' },
  description:
    'Ram Niwash Pandey, Senior Software Engineer in Pune. React, Next.js, frontend architecture and accessible, AI-enabled applications.',
  openGraph: {
    title: 'Ram Pandey — Engineering thoughtful digital experiences',
    description: 'Frontend engineering. System thinking. Human-centered experiences.',
    images: ['/images/profile/ram-pandey.webp'],
  },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* React hoists this external resource; render blocking prevents a theme flash. */}
        <script id="theme-initializer" src="/theme-init.js" async blocking="render" />
      </head>
      <body>
        <Shell>{children}</Shell>
        <script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ram Niwash Pandey',
              url: origin,
              jobTitle: 'Senior Software Engineer I',
              sameAs: [
                'https://github.com/approton',
                'https://www.linkedin.com/in/ram-niwash-pandey-2580ab172/',
              ],
              image: origin + '/images/profile/ram-pandey.webp',
            }).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
