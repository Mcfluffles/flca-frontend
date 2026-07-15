import { normalizeOperatorRoutes } from "./normalizeOperatorRoutes.js";

export function findEndToEndOperators(
    routeChain,
    operatorRoutes
) {
    const directedOperatorRoutes =
        normalizeOperatorRoutes(operatorRoutes);

    const operatorsByLeg = routeChain.map(leg => {
        return new Set(
            directedOperatorRoutes
                .filter(route =>
                    route.OriginCode === leg.origin_code &&
                    route.DestinationCode === leg.destination_code
                )
                .map(route => route.OperatorCode)
        );
    });

    if (operatorsByLeg.length === 0) {
        return [];
    }

    return [...operatorsByLeg[0]].filter(operatorCode =>
        operatorsByLeg.every(operatorSet =>
            operatorSet.has(operatorCode)
        )
    );
}