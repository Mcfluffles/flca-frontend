//@ts-check

import * as afunc from "./index.js";

async function main() {
    const [
        routes,
        serviceLevels,
        operators,
        operatorRoutes
    ] = await Promise.all([
        afunc.pullFLNRoutes(),
        afunc.pullServiceLevels(),
        afunc.pullOperators(),
        afunc.pullOperatorRoutes()
    ]);

    console.log({
        routes,
        serviceLevels,
        operators,
        operatorRoutes
    });

    // Build tables first while debugging
    afunc.buildRouteTable(
        "ben-planetary-table",
        routes,
        "Planetary",
        "BEN"
    );

    afunc.buildRouteTable(
        "arc-planetary-table",
        routes,
        "Planetary",
        "ARC"
    );

    afunc.buildRouteTable(
        "exchange-table",
        routes,
        "Exchange"
    );

    afunc.buildQuoteCalculator(
        routes,
        serviceLevels,
        operators,
        operatorRoutes
    );
}

main().catch(err => {
    console.error("Frontend initialization failed:", err);
});
