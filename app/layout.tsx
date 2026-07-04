import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e1e2e',
};

export const metadata: Metadata = {
  title: 'EditorMD — Markdown Editor',
  description: 'A beautiful, serverless Markdown editor. Open, edit and save .md files directly from your device.',
  keywords: ['markdown', 'editor', 'notes', 'serverless', 'joplin'],
  authors: [{ name: 'EditorMD' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
