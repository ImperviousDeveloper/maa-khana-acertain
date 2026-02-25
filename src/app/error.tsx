"use client";

import Error1 from "~/components/error-pages/Error1";
import ErrorPageContainer from "~/components/error-pages/ErrorPageContainer";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <>
            {/* <Error1 error={error} reset={reset} /> */}
            <ErrorPageContainer />
        </>
    );
}