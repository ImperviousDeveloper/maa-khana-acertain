import React from "react";

interface MaaKhanaLogoProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default function MaaKhanaLogo({
    width = 520,
    height = 140,
    className = "",
}: MaaKhanaLogoProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 520 140"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
        >
            {/* Background circle */}
            <g transform="translate(10,10)">
                <circle
                    cx="60"
                    cy="60"
                    r="55"
                    style={{ fill: "var(--logo-secondary)", opacity: 0.12 }}
                />

                {/* Sun */}
                <circle
                    cx="75"
                    cy="40"
                    r="10"
                    style={{ fill: "var(--logo-accent)" }}
                />

                {/* Cloud */}
                <g style={{ fill: "var(--logo-primary)", opacity: 0.9 }}>
                    <circle cx="95" cy="45" r="8" />
                    <circle cx="105" cy="48" r="7" />
                    <circle cx="85" cy="48" r="7" />
                    <rect x="85" y="48" width="25" height="8" rx="4" />
                </g>

                {/* Hills */}
                <path
                    d="M10 80 Q40 55 70 80 T120 80 V110 H10 Z"
                    style={{ fill: "var(--logo-secondary)" }}
                />

                {/* Trees */}
                <g style={{ fill: "var(--logo-secondary)" }}>
                    <circle cx="45" cy="70" r="8" />
                    <rect x="43" y="70" width="4" height="12" />

                    <circle cx="90" cy="72" r="7" />
                    <rect x="88" y="72" width="4" height="11" />
                </g>

                {/* Curve */}
                <path
                    d="M5 95 Q60 130 120 95"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.6"
                />
            </g>

            {/* Text */}
            <text
                x="150"
                y="80"
                fontSize="48"
                fontWeight="600"
                fill="var(--logo-text)"
                style={{ fontFamily: "Poppins, Inter, Arial, sans-serif" }}
            >
                MaaKhana
            </text>
        </svg>
    );
}