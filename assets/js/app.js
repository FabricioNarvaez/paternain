import { appendField } from "./common.js";

const groupA = [
  { team: "Los Panas",      PG: 4, PE: 0, PP: 0, GF: 23,  GC: 6, lastPos: 1},
  { team: "Peñarol",        PG: 2, PE: 0, PP: 3, GF: 21,  GC: 21, lastPos: 3},
  { team: "Comboloco",      PG: 4, PE: 0, PP: 0, GF: 22,  GC: 3, lastPos: 2},
  { team: "Los Rumberos",   PG: 1, PE: 0, PP: 3, GF: 13,  GC: 26, lastPos: 5},
  { team: "Latin Brothers", PG: 2, PE: 0, PP: 2, GF: 14,   GC: 10, lastPos: 4},
  { team: "Golden",         PG: 0, PE: 0, PP: 5, GF: 2,   GC: 30, lastPos: 6}
];

const grupoB = [
  { team: "Impersiva",      PG: 2, PE: 0, PP: 3, GF: 9,   GC: 14, lastPos: 4},
  { team: "Estella",        PG: 0, PE: 2, PP: 3, GF: 5,   GC: 10, lastPos: 5},
  { team: "Cancheritos",    PG: 0, PE: 1, PP: 4, GF: 7,   GC: 16, lastPos: 6},
  { team: "El Valle",       PG: 3, PE: 0, PP: 2, GF: 15,  GC: 8, lastPos: 3},
  { team: "Spencer",        PG: 4, PE: 1, PP: 0, GF: 15,   GC: 7, lastPos: 1},
  { team: "Amistad",        PG: 4, PE: 0, PP: 1, GF: 13,   GC: 9, lastPos: 2}
];

function createRow(team, index){
    const row = document.createElement("tr");

    const pos = index + 1;
    row.appendChild(appendField(pos));
    if(pos <= 2){
      row.children[0].classList.add("qualifiedToChampions");
    }

    const teamField = document.createElement("td");
    teamField.style.width = "280px";
    const difPos = team.lastPos - pos;
    const leftText = document.createElement("span");
    leftText.textContent = team.team;
    leftText.classList.add("leftText");

    const rightText = document.createElement("span");
    const triangle = document.createElement("span");
    triangle.classList.add("triangle");
    const difPosSpan = document.createElement("span");
    difPosSpan.style.marginRight = "5px";
    if(difPos < 0){
      triangle.classList.add("redTriangle");
      difPosSpan.textContent = `${Math.abs(difPos)}`;
      rightText.style.color = "red";
    }else if(difPos > 0){
      triangle.classList.add("greenTriangle");
      difPosSpan.textContent = `${Math.abs(difPos)}`;
      rightText.style.color = "green";
    }
    rightText.appendChild(triangle);
    rightText.appendChild(difPosSpan);
    rightText.classList.add("rightText");
    teamField.appendChild(leftText);
    teamField.appendChild(rightText);
    row.appendChild(teamField);

    row.appendChild(appendField(team.PJ));
    row.appendChild(appendField(team.PG));
    row.appendChild(appendField(team.PE));
    row.appendChild(appendField(team.PP));
    row.appendChild(appendField(team.GF));
    row.appendChild(appendField(team.GC));

    row.appendChild(appendField(team.GD));
    row.children[8].style.fontWeight = "bold";
    if(team.GD > 0){
      row.children[8].style.color = "green";
    }else if(team.GD < 0){
      row.children[8].style.color = "red";
    }

    row.appendChild(appendField(team.Pts));
    row.children[9].classList.add("lastColumnRows");

    return row;
}

function processGroupA(team, index) {
    const bodyTableA = document.getElementById("groupA");
    bodyTableA.appendChild(createRow(team, index));
};

function processGroupB(team, index) {
    const bodyTableB = document.getElementById("groupB");
    bodyTableB.appendChild(createRow(team, index));
};

function calculatePointsGoalsMatches(team){
    const points = team.PG * 3;
    team.Pts = team.PE ? (points + team.PE) : points;

    const gd = team.GF - team.GC;
    team.GD = gd > 0 ? `+${gd}` : gd;

    team.PJ = team.PG + team.PE + team.PP;
}

function sortByPointsAndGoals(a, b) {
    if (a.Pts > b.Pts) {
      return -1;
    } else if (a.Pts < b.Pts) {
      return 1;
    } else {
      if (a.GD > b.GD) {
        return -1;
      } else if (a.GD < b.GD) {
        return 1;
      } else {
        return 0;
      }
    }
}

groupA.forEach(calculatePointsGoalsMatches);
groupA.sort(sortByPointsAndGoals);
groupA.forEach(processGroupA);

grupoB.forEach(calculatePointsGoalsMatches);
grupoB.sort(sortByPointsAndGoals);
grupoB.forEach(processGroupB);
