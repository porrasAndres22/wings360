import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        "theme_color": "#e6e9ff",
        "background_color": "#ecf4ff",
        "icons": [
            {
                "purpose": "maskable",
                "sizes": "400x400",
                "src": "/logo-wings-rounded.png",
                "type": "image/png"
            },
            {
                "purpose": "any",
                "sizes": "400x400",
                "src": "/logo-wings-rounded.png",
                "type": "image/png"
            }
        ],
        "screenshots": [
            {
                "sizes": "400x400",
                "src": "/logo-wings-rounded.png",
                "type": "image/png",
                "form_factor": "narrow",
                "label": "Wings 360"
            },
            {
                "sizes": "400x400",
                "src": "/logo-wings-rounded.png",
                "type": "image/png",
                "form_factor": "wide",
                "label": "Wings 360"
            }
        ],
        "orientation": "any",
        "display": "standalone",
        "dir": "auto",
        "lang": "es-US",
        "name": "Wings 360",
        "short_name": "Wings 360",
        "start_url": "/",
        "scope": "/",
        "description": "Proyecto 360",
        "id": "/"
    }
}