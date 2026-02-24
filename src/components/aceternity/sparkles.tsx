"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { cn } from "~/lib/utils";

export const SparklesCore = (props: {
    id?: string;
    className?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    particleColor?: string;
    particleSpeed?: number;
}) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        particleDensity,
        particleColor,
        particleSpeed,
    } = props;
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container) => { };

    return (
        <div className={cn("opacity-0", init && "opacity-100", className)}>
            {init && (
                <Particles
                    id={id || useId()}
                    className={cn("h-full w-full")}
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: background || "transparent",
                            },
                        },
                        fullScreen: {
                            enable: false,
                            zIndex: 1,
                        },

                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                                resize: {
                                    enable: true,
                                },
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            bounce: {
                                horizontal: {
                                    value: 1,
                                },
                                vertical: {
                                    value: 1,
                                },
                            },
                            collisions: {
                                absorb: {
                                    speed: 2,
                                },
                                bounce: {
                                    horizontal: {
                                        value: 1,
                                    },
                                    vertical: {
                                        value: 1,
                                    },
                                },
                                enable: false,
                                maxSpeed: 50,
                                mode: "bounce",
                                overlap: {
                                    enable: true,
                                    retries: 0,
                                },
                            },
                            color: {
                                value: particleColor || "#ffffff",
                            },
                            groups: {},
                            move: {
                                angle: {
                                    offset: 0,
                                    value: 90,
                                },
                                attract: {
                                    distance: 200,
                                    enable: false,
                                    rotate: {
                                        x: 600,
                                        y: 1200,
                                    },
                                },
                                center: {
                                    x: 50,
                                    y: 50,
                                    mode: "percent",
                                    radius: 0,
                                },
                                decay: 0,
                                distance: {},
                                direction: "none",
                                drift: 0,
                                enable: true,
                                gravity: {
                                    acceleration: 9.81,
                                    enable: false,
                                    inverse: false,
                                    maxSpeed: 50,
                                },
                                path: {
                                    clamp: true,
                                    delay: {
                                        random: {
                                            enable: false,
                                            minimumValue: 0,
                                        },
                                        value: 0,
                                    },
                                    enable: false,
                                    options: {},
                                },
                                outModes: {
                                    default: "out",
                                },
                                random: false,
                                size: false,
                                speed: particleSpeed || 1,
                                spin: {
                                    acceleration: 0,
                                    enable: false,
                                },
                                straight: false,
                                trail: {
                                    enable: false,
                                    length: 10,
                                    fill: {},
                                },
                                vibrate: false,
                                warp: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    width: 400,
                                    height: 400,
                                },
                                limit: {
                                    mode: "delete",
                                    value: 0,
                                },
                                value: particleDensity || 120,
                            },
                            opacity: {
                                value: {
                                    min: 0.1,
                                    max: 1,
                                },
                                animation: {
                                    count: 0,
                                    enable: true,
                                    speed: 4,
                                    decay: 0,
                                    delay: 0,
                                    sync: false,
                                    mode: "auto",
                                    startValue: "random",
                                    destroy: "none",
                                },
                            },
                            reduceDuplicates: false,
                            shadow: {
                                blur: 0,
                                color: {
                                    value: "#000",
                                },
                                enable: false,
                                offset: {
                                    x: 0,
                                    y: 0,
                                },
                            },
                            shape: {
                                close: true,
                                fill: true,
                                options: {},
                                type: "circle",
                            },
                            size: {
                                value: {
                                    min: minSize || 1,
                                    max: maxSize || 3,
                                },
                                animation: {
                                    count: 0,
                                    enable: false,
                                    speed: 5,
                                    decay: 0,
                                    delay: 0,
                                    sync: false,
                                    mode: "auto",
                                    startValue: "random",
                                    destroy: "none",
                                },
                            },
                            stroke: {
                                width: 0,
                            },
                            zIndices: {
                                opacityRate: 1,
                                sizeRate: 1,
                                velocityRate: 1,
                            },
                            destroy: {
                                bounds: {},
                                mode: "none",
                                split: {
                                    count: 1,
                                    factor: {
                                        value: 3,
                                    },
                                    rate: {
                                        value: {
                                            min: 4,
                                            max: 9,
                                        },
                                    },
                                    sizeOffset: true,
                                },
                            },
                            roll: {
                                darken: {
                                    enable: false,
                                    value: 0,
                                },
                                enable: false,
                                enlighten: {
                                    enable: false,
                                    value: 0,
                                },
                                mode: "vertical",
                                speed: 25,
                            },
                            tilt: {
                                animation: {
                                    enable: false,
                                    speed: 0,
                                    decay: 0,
                                },
                                direction: "clockwise",
                                enable: false,
                                value: 0,
                            },
                            twinkle: {
                                lines: {
                                    enable: false,
                                    frequency: 0.05,
                                    opacity: 1,
                                },
                                particles: {
                                    enable: false,
                                    frequency: 0.05,
                                    opacity: 1,
                                },
                            },
                            wobble: {
                                distance: 5,
                                enable: false,
                                speed: {
                                    angle: 50,
                                    move: 10,
                                },
                            },
                            life: {
                                count: 0,
                                delay: {
                                    random: {
                                        enable: false,
                                        minimumValue: 0,
                                    },
                                    value: 0,
                                    sync: false,
                                },
                                duration: {
                                    random: {
                                        enable: false,
                                        minimumValue: 0.0001,
                                    },
                                    value: 0,
                                    sync: false,
                                },
                            },
                            rotate: {
                                animation: {
                                    enable: false,
                                    speed: 0,
                                    decay: 0,
                                },
                                direction: "clockwise",
                                enable: false,
                                path: false,
                                value: 0,
                            },
                            orbit: {
                                animation: {
                                    count: 0,
                                    enable: false,
                                    speed: 1,
                                    decay: 0,
                                    delay: 0,
                                    sync: false,
                                },
                                enable: false,
                                opacity: 1,
                                rotation: {
                                    value: 45,
                                },
                                width: 1,
                            },
                            links: {
                                blink: false,
                                color: {
                                    value: "#fff",
                                },
                                consent: false,
                                distance: 100,
                                enable: false,
                                frequency: 1,
                                opacity: 1,
                                shadow: {
                                    blur: 5,
                                    color: {
                                        value: "#000",
                                    },
                                    enable: false,
                                },
                                triangles: {
                                    enable: false,
                                    frequency: 1,
                                },
                                width: 1,
                                warp: false,
                            },
                            repulse: {
                                value: 0,
                                enabled: false,
                                distance: 1,
                                duration: 1,
                                factor: 1,
                                speed: 1,
                            },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </div>
    );
};
