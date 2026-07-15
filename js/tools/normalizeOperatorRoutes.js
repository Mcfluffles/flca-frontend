export function normalizeOperatorRoutes(operatorRoutes) {
    return operatorRoutes.flatMap(route => [
        route,
        {
            ...route,
            OriginCode: route.DestinationCode,
            DestinationCode: route.OriginCode
        }
    ]);
}