import { appendField } from "./common.js";
import { url } from "./url.js";

const loaderScorers = document.getElementById("loaderScorers");

(async () => {
    const response = await fetch(`${url}api/teams/players`);
    const { data } = await response.json();
    loaderScorers.remove();
    const scorrersTable = document.getElementById("scorersTable");
    if (data && data.length !== 0) {
        //TODO: Descomentar esto
        // data.forEach((player, index) => {
        //     const row = document.createElement("tr");
        //     const pos = index + 1;
        //     const firstScorer = (pos === 1) ? true : false;
        //     row.appendChild(appendField(pos, firstScorer));
        //     row.appendChild(appendField(player.name));
        //     row.appendChild(appendField(player.team));
        //     row.appendChild(appendField(player.goals));

        //     scorrersTable.appendChild(row);
        // });
        //TODO: Borrar esto
        const row = document.createElement("tr");
        for (let i = 0; i < 4; i++) {
            row.appendChild(appendField("Sin datos"));
        }
        scorrersTable.appendChild(row);
    } else {
        const row = document.createElement("tr");
        for (let i = 0; i < 4; i++) {
            row.appendChild(appendField("Sin datos"));
        }
        scorrersTable.appendChild(row);
    }
})();
