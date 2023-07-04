import { url } from "./url.js";
$(document).ready(async function() {
    $('.select').select2();
    const response = await fetch(`${url}api/teams`);
    const { teamsGroupA, teamsGroupB } = await response.json();
    const teamsCollection = teamsGroupA.concat(teamsGroupB);
    const local = $("#local");
    const visitor = $("#visitor");
  
    teamsCollection.forEach(function(team) {
      const newOptionLocal = $("<option></option>").val(team.team).text(team.team);
      local.append(newOptionLocal);
  
      const newOptionVisitor = $("<option></option>").val(team.team).text(team.team);
      visitor.append(newOptionVisitor);
    });

    $('#local').on('change', function() {
        console.log($(this).val());
    });
});


//TODO: Change the way to send data to backend
// function updatePutValues(goalsLocal, goalsVisitante) {
//     let putLocal, putVisitante;
//     if (goalsLocal === goalsVisitante) {
//         putLocal = putVisitante = {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 PE: 1,
//                 GF: goalsLocal,
//                 GC: goalsVisitante,
//             }),
//         };
//     } else if (goalsLocal > goalsVisitante) {
//         putLocal = {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 PG: 1,
//                 GF: goalsLocal,
//                 GC: goalsVisitante,
//             }),
//         };
//         putVisitante = {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 PP: 1,
//                 GF: goalsVisitante,
//                 GC: goalsLocal,
//             }),
//         };
//     } else {
//         putLocal = {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 PP: 1,
//                 GF: goalsLocal,
//                 GC: goalsVisitante,
//             }),
//         };
//         putVisitante = {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 PG: 1,
//                 GF: goalsVisitante,
//                 GC: goalsLocal,
//             }),
//         };
//     }
//     return [putLocal, putVisitante];
// }

// const sendButton = document.getElementById("send");
// sendButton.addEventListener("click", async () => {
//     const error = document.getElementById("error-id");
//     if (error) {
//         error.remove();
//     }
//     const localA = document.getElementById("opcionesLocalA").value;
//     const visitanteA = document.getElementById("opcionesVisitanteA").value;
//     const localB = document.getElementById("opcionesLocalB").value;
//     const visitanteB = document.getElementById("opcionesVisitanteB").value;
//     const goalsLocalA = document.getElementById("goalsLocalA").value;
//     const goalsVisitanteA = document.getElementById("goalsVisitanteA").value;
//     const goalsLocalB = document.getElementById("goalsLocalB").value;
//     const goalsVisitanteB = document.getElementById("goalsVisitanteB").value;

//     if (
//         localA === "" ||
//         visitanteA === "" ||
//         localB === "" ||
//         visitanteB === "" ||
//         goalsLocalA === "" ||
//         goalsVisitanteA === "" ||
//         goalsLocalB === "" ||
//         goalsVisitanteB === "" ||
//         localA === visitanteA ||
//         localB === visitanteB
//     ) {
//         const errorElement = document.createElement("p");
//         errorElement.id = "error-id";
//         errorElement.textContent =
//             "Faltan datos o no son correctos. Compruebe que ha introducido todos los datos y que son correctos.";
//         errorElement.style.color = "red";
//         const error = document.getElementById("dataError");
//         error.appendChild(errorElement);
//         return;
//     } else {
//         const [putLocalA, putVisitanteA] = updatePutValues(
//             goalsLocalA,
//             goalsVisitanteA
//         );
//         const [putLocalB, putVisitanteB] = updatePutValues(
//             goalsLocalB,
//             goalsVisitanteB
//         );

//         const [
//             responseLocalA,
//             responseVisitanteA,
//             responseLocalB,
//             responseVisitanteB,
//         ] = await Promise.all([
//             fetch(`${url}/api/team/a/${localA}`, putLocalA),
//             fetch(`${url}/api/team/a/${visitanteA}`, putVisitanteA),
//             fetch(`${url}/api/team/b/${localB}`, putLocalB),
//             fetch(`${url}/api/team/b/${visitanteB}`, putVisitanteB),
//         ]);

//         const [dataLocalA, dataVisitanteA, dataLocalB, dataVisitanteB] =
//             await Promise.all([
//                 responseLocalA.json(),
//                 responseVisitanteA.json(),
//                 responseLocalB.json(),
//                 responseVisitanteB.json(),
//             ]);

//         if (
//             dataLocalA.status === "Updated" &&
//             dataVisitanteA.status === "Updated" &&
//             dataLocalB.status === "Updated" &&
//             dataVisitanteB.status === "Updated"
//         ) {
//             alert("Resultados actualizados");
//             location.reload();
//         }
//     }
// });
