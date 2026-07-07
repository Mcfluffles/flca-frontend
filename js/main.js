//@ts-check
const response = await fetch("https://api.flca.space/api/routes");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
const routes = await response.json();

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

buildRouteTable("planetary-table", routes, "Planetary");
buildRouteTable("exchange-table", routes, "Exchange");