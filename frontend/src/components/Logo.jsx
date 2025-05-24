import React from 'react'

function Logo() {
    return (
        <div>
            <svg
                viewBox="0 0 320 60"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Cart with arrow icon */}
                <g>
                    <rect x="10" y="20" width="35" height="22" rx="4" ry="4" fill="#ef4444" />
                    <circle cx="17" cy="45" r="3" fill="#b91c1c" />
                    <circle cx="37" cy="45" r="3" fill="#b91c1c" />
                    <path
                        d="M18 32 L28 32 L24 28 M28 32 L24 36"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>

                {/* Vibe */}
                <text x="60" y="42" fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="600" fill="#f87171">
                    Vibe
                </text>

                {/* Kart */}
                <text x="130" y="42" fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="800" fill="#b91c1c">
                    Kart
                </text>
            </svg>
        </div>
    )
}

export default Logo
