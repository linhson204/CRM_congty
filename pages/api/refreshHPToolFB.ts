import { NextRouter } from "next/router";
import { useEffect } from "react";

export function checkAndRedirectToHome(router: NextRouter) {
    useEffect(() => {
        const isReload =
        (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)
            ?.type === "reload";

        if (isReload) {
        router.replace("/toolfacebook/tham-gia-nhom/HomePage");
        }
    }, []);
}