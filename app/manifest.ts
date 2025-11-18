import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    "theme_color": "#F2CFF5",
    "background_color": "#D7EEFE",
    "icons": [
      {
        "purpose": "maskable",
        "sizes": "320x320",
        "src": "/logo-wings.png",
        "type": "image/png"
      },
      {
        "purpose": "any",
        "sizes": "320x320",
        "src": "/logo-wings.png",
        "type": "image/png"
      }
    ],
    "screenshots": [
      {
        "src": "/logo-wings.png",
        "sizes": "320x320",
        "type": "image/png",
        "form_factor": "narrow",
        "label": "Wings Guatemala"
      },
      {
        "src": "/logo-wings.png",
        "sizes": "320x320",
        "type": "image/png",
        "form_factor": "wide",
        "label": "Wings Guatemala"
      }
    ],
    "orientation": "any",
    "display": "standalone",
    "dir": "auto",
    "lang": "es-US",
    "name": "Wings 360",
    "short_name": "Wings Guatemala",
    "start_url": "/",
    "scope": "/",
    "description": "WINGS Guatemala provides quality reproductive health education and services to underserved, primarily rural Guatemalan youth, women, and men.",
    "id": "/"
  }
}

