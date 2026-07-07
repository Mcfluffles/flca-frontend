import * as afunc from "./index.js";

async function main() {
    const production = await afunc.pullMemberProduction();

    afunc.buildGenericTable("member-production-table", production, [
        { key: "CompanyCode", label: "Company" },
        { key: "Ticker", label: "Ticker" },
        { key: "Name", label: "Name" },
        { key: "NetPerDay", label: "Net / Day" }
    ]);
}

main();