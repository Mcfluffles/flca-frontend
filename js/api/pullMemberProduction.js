// js/api/pullMemberProduction.js

export async function pullMemberProduction() {
    const response = await fetch("https://api.flca.space/api/member-production");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}