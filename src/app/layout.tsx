import type { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  JetBrains_Mono,
  Noto_Nastaliq_Urdu,
} from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-nastaliq-urdu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Echoes & Patterns — Pakistan's 79th Independence Day Tribute",
  description:
    "An interactive tribute to Pakistan's 79th Independence Day — journey through history, regional heritage, and craft, then create your own digital keepsake.",
  openGraph: {
    title: "Echoes & Patterns — Pakistan's 79th Independence Day Tribute",
    description:
      "An interactive tribute to Pakistan's 79th Independence Day — journey through history, regional heritage, and craft, then create your own digital keepsake.",
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} ${notoNastaliqUrdu.variable}`}
    >
      <body className="antialiased bg-emerald-deep text-cream-archival selection:bg-gold-antique selection:text-emerald-deep">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
