export async function pullOperatorRoutes() {
    const response = await fetch(
        "https://api.flca.space/api/operator-routes"
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}