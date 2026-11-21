// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AfriScholar',
    short_name: 'AfriScholar',
    description: 'Learn. Apply. Get funded.',
    start_url: '/',
    display: 'standalone', // This makes it look like a native app
    background_color: '#f7f3e9', // Your paper color
    theme_color: '#0f3d2e', // Your forest green color
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable', // Crucial for Android adaptive icons
      },
    ],
  }
}