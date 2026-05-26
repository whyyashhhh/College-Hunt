import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AnimatedBackground } from '@/components/animated-background';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

export const metadata: Metadata = {
  title: {
    default: 'CollegeHunt',
    template: '%s | CollegeHunt'
  },
  description: 'CollegeHunt is a premium AI college discovery and comparison platform for students in India.',
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg'
  },
  openGraph: {
    title: 'CollegeHunt',
    description: 'Discover, compare, shortlist, and analyze Indian colleges with a premium SaaS experience.'
  }
};

export const viewport = {
  themeColor: '#09090b'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-[#f7f4ee] text-zinc-900 antialiased`}>
        <AnimatedBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
