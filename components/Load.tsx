export default () => {
    return (
        <>
            <div className="logo-wrapper">
                <div className="logo-container">
                    <div className="diamond diamond-1"></div>
                    <div className="diamond diamond-2"></div>
                    <div className="diamond diamond-3"></div>
                    <div className="diamond diamond-4"></div>
                </div>
                <span className="logo-text">Power by Atlas</span>
            </div>

            <style jsx>{`.logo-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 14px;
            min-height: 100vh;
            width: 100%;
            top: 0;
            left: 0;
            box-sizing: border-box;
        }

        .logo-container {
            position: relative;
            width: clamp(100px, 30vmin, 147px);
            height: clamp(100px, 30vmin, 147px);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: rotateContainer 6s ease-in-out infinite 1s;
        }

        @keyframes rotateContainer {
            0%, 100% {
                transform: rotate(0deg);
            }
            25% {
                transform: rotate(10deg);
            }
            75% {
                transform: rotate(-10deg);
            }
        }

        .diamond {
            position: absolute;
            border-style: solid;
            border-color: #000000;
            border-width: clamp(3px, 1vmin, 5px);
            transform: rotate(45deg);
            background: transparent;
        }

        .diamond-1 {
            width: 66.67%;
            height: 66.67%;
            animation: entrance1 1s ease-out forwards, pulse1 2s ease-in-out infinite 1s, glow 2s ease-in-out infinite 1s;
        }

        .diamond-2 {
            width: 46.67%;
            height: 46.67%;
            animation: entrance2 1s ease-out 0.15s forwards, pulse2 2s ease-in-out infinite 1.15s, glow 2s ease-in-out infinite 1.15s;
        }

        .diamond-3 {
            width: 26.67%;
            height: 26.67%;
            animation: entrance3 1s ease-out 0.3s forwards, pulse3 2s ease-in-out infinite 1.3s, glow 2s ease-in-out infinite 1.3s;
        }

        .diamond-4 {
            width: 10%;
            height: 10%;
            background: #000000;
            border: none;
            animation: entrance4 1s ease-out 0.45s forwards, pulse4 2s ease-in-out infinite 1.45s, glow 2s ease-in-out infinite 1.45s;
        }

        @keyframes pulse1 {
            0%, 100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: rotate(45deg) scale(1.05);
                opacity: 0.8;
            }
        }

        @keyframes pulse2 {
            0%, 100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: rotate(45deg) scale(1.08);
                opacity: 0.85;
            }
        }

        @keyframes pulse3 {
            0%, 100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: rotate(45deg) scale(1.1);
                opacity: 0.9;
            }
        }

        @keyframes pulse4 {
            0%, 100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: rotate(45deg) scale(1.2);
                opacity: 0.95;
            }
        }

        @keyframes glow {
            0%, 100% {
                filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
            }
            50% {
                filter: drop-shadow(0 0 13px rgba(0, 0, 0, 0.8));
            }
        }

        @keyframes entrance1 {
            0% {
                transform: rotate(45deg) scale(0);
                opacity: 0;
            }
            100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
        }

        @keyframes entrance2 {
            0% {
                transform: rotate(45deg) scale(0);
                opacity: 0;
            }
            100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
        }

        @keyframes entrance3 {
            0% {
                transform: rotate(45deg) scale(0);
                opacity: 0;
            }
            100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
        }

        @keyframes entrance4 {
            0% {
                transform: rotate(45deg) scale(0);
                opacity: 0;
            }
            100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
        }

        /* Texto del logo */
        .logo-text {
            margin-top: clamp(20px, 5vmin, 40px);
            font-family: 'Arial', sans-serif;
            font-size: clamp(7px, 1.7vmin, 9px);
            font-weight: bold;
            color: #000000;
            letter-spacing: clamp(3px, 1.3vmin, 5px);
            text-transform: uppercase;
            opacity: 0;
            animation: fadeInText 1s ease-out 1s forwards;
            text-align: center;
        }

        @keyframes fadeInText {
            0% {
                opacity: 0;
                transform: translateY(13px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Optimizaciones para móviles */
        @media (max-width: 480px) {
            .logo-container {
                width: 27vmin;
                height: 27vmin;
            }

            .diamond {
                border-width: 2px;
            }

            .logo-text {
                font-size: clamp(5px, 1.3vmin, 7px);
                letter-spacing: clamp(1px, 0.7vmin, 3px);
                margin-top: clamp(10px, 3vmin, 20px);
            }

            /* Reducir intensidad de animaciones para mejor rendimiento */
            @keyframes glow {
                0%, 100% {
                    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.4));
                }
                50% {
                    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.7));
                }
            }
        }

        /* Tablets */
        @media (min-width: 481px) and (max-width: 768px) {
            .logo-container {
                width: 23vmin;
                height: 23vmin;
            }

            .diamond {
                border-width: 3px;
            }

            .logo-text {
                font-size: clamp(6px, 1.5vmin, 8px);
                margin-top: clamp(13px, 3vmin, 27px);
            }
        }

        /* Landscape móvil */
        @media (max-height: 500px) and (orientation: landscape) {
            .logo-container {
                width: 19vmin;
                height: 19vmin;
            }

            .diamond {
                border-width: 2px;
            }

            .logo-text {
                margin-top: 7px;
                font-size: 7px;
                letter-spacing: 2px;
            }
        }

        /* Preferencia de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
            .diamond-1,
            .diamond-2,
            .diamond-3,
            .diamond-4 {
                animation: none;
                transform: rotate(45deg);
                opacity: 1;
            }

            .logo-text {
                animation: none;
                opacity: 1;
            }
        }

        /* Modo oscuro del sistema */
        @media (prefers-color-scheme: light) {
            body {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            }
        }

        /* Touch feedback para dispositivos táctiles */
        @media (hover: none) and (pointer: coarse) {
            .logo-container {
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
            }

            .logo-container:active .diamond {
                filter: drop-shadow(0 0 17px rgba(0, 0, 0, 1));
            }
        }`}</style>

        </>
    )
}