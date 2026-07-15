export async function pullOperators() {
    const response = await fetch(
        "https://api.flca.space/api/operators"
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}