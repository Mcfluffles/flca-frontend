//@ts-check

//Constants
const SCU_RATE_CIS = 6000;
const SCU_RATE_CAT = 2400;

//Fetch and store API Data for use
const response = await fetch("https://api.flca.space/api/routes");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
const routes = await response.json();

// This function builds the HMTL routing tables.
async function buildRouteTable(tableId, routes, serviceType) {

    try {
        

        const filteredRoutes = routes.filter(r => r.service_type === serviceType);

        const table = document.getElementById(tableId);

        const columns = [
            { key: "route", label: "Route" },
            { key: "fuel_cis", label: "Fuel (CIS)" },
            { key: "fuel_cat", label: "Fuel (CAT)" },
            { key: "notes", label: "Notes" }
        ];

        let html = "<thead><tr>";

        columns.forEach(col => {
            html += `<th>${col.label}</th>`;
        });

        html += "</tr></thead><tbody>";

                filteredRoutes.forEach(row => {

            html += "<tr>";

            columns.forEach((col, index) => {

                const value = row[col.key] ?? "";

                if (index === 0) {
                    html += `<td>${value}</td>`;
                } else {
                    html += `<td>${value}</td>`;
                }

            });

            html += "</tr>";

        });

        html += "</tbody>";

        table.innerHTML = html;
    }

    catch (err) {

        console.error(err);

        document.getElementById(tableId).innerHTML =
            `<tr><td>Failed to load route table.</td></tr>`;
    }
}



async function buildQuoteCalculator(routes) {

    const routeSelect = document.getElementById("quote-route");
    const scuInput = document.getElementById("quote-scus");
    const currencySelect = document.getElementById("quote-currency");
    const resultBox = document.getElementById("quote-result");

    routeSelect.innerHTML = routes.map((route, index) => {
        return `<option value="${index}">${route.route}</option>`;
    }).join("");

    function calculateQuote() {
        const selectedRoute = routes[Number(routeSelect.value)];
        const scus = Math.max(1, Math.ceil(Number(scuInput.value) || 1));
        const currency = currencySelect.value;

        const scuRate = currency === "cat" ? SCU_RATE_CAT : SCU_RATE_CIS;
        const fuelCost = currency === "cat" ? selectedRoute.fuel_cat : selectedRoute.fuel_cis;

        const freightCost = scus * scuRate;
        const total = freightCost + fuelCost;

        const label = currency.toUpperCase();

        resultBox.innerHTML = `
            Freight: ${scus} SCU × ${scuRate.toLocaleString()} ${label} = ${freightCost.toLocaleString()} ${label}
            <span>Fuel: ${selectedRoute.route} = ${fuelCost.toLocaleString()} ${label}</span>
            <span>Total Quote: ${total.toLocaleString()} ${label}</span>
        `;
    }

    scuInput.addEventListener("input", calculateQuote);
    routeSelect.addEventListener("change", calculateQuote);
    currencySelect.addEventListener("change", calculateQuote);

    calculateQuote();
}


//Call and build the quote calculator
buildQuoteCalculator(routes);

//Call and build the route tables
buildRouteTable("planetary-table", routes, "Planetary");
buildRouteTable("exchange-table", routes, "Exchange");