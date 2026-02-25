"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
// import { Button } from "../aceternity/moving-border";

export default function ErrorPageContainer() {
    return (
        <div>
            <section className="page_404 flex items-center justify-center">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">404 ERROR</h1>
                                </div>
                                <div className="contentBox">
                                    <h3 className="text-xl h2">Something Went Wrong..!</h3>
                                    <p>We can't seem to find the page you're looking for.</p>
                                    <Button
                                        className="font-semibold text-white mt-4 text-sm bg-[radial-gradient(var(--orange-500)_40%,transparent_60%)]"
                                    >
                                        <Link href={"/"}>
                                            Go to Home
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}