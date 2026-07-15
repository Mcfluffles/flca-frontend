import { normalizeOperatorRoutes } from "./normalizeOperatorRoutes.js";

export function findOperatorsByLeg(
    routeChain,
    operatorRoutes
) {
    const directedOperatorRoutes =
        normalizeOperatorRoutes(operatorRoutes);

    return routeChain.map(leg => {
        const operatorCodes = directedOperatorRoutes
            .filter(route =>
                route.OriginCode === leg.origin_code &&
                route.DestinationCode === leg.destination_code
            )
            .map(route => route.OperatorCode);

        return {
            OriginCode: leg.origin_code,
            DestinationCode: leg.destination_code,
            OperatorCodes: [...new Set(operatorCodes)]
        };
    });
}