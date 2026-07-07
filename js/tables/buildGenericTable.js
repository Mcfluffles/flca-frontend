// js/tables/buildGenericTable.js

export function buildGenericTable(tableId, data, columns) {
    const table = document.getElementById(tableId);

    if (!table || !data.length) return;

    let html = "<thead><tr>";

    columns.forEach(col => {
        html += `<th>${col.label}</th>`;
    });

    html += "</tr></thead><tbody>";

    data.forEach(row => {
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