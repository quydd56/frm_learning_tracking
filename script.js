async function loadData() {
  const res = await fetch("frm_full.json");
  const data = await res.json();

  const tbody = document.getElementById("table-body");

  data.forEach((row, i) => {
    const tr = document.createElement("tr");

    tr.dataset.level = row.level;
    tr.dataset.index = i;

    // ===== topic =====
    const td1 = document.createElement("td");
    td1.className = "level-" + row.level;

    if (row.level <= 2) {
      const toggle = document.createElement("span");
      toggle.innerText = "[+]";
      toggle.className = "toggle";

      toggle.onclick = () => toggleRow(i);

      td1.appendChild(toggle);
    }

    td1.appendChild(document.createTextNode(" " + row.subtopic));

    // ===== status =====
    const td2 = document.createElement("td");
    td2.innerText = row.status;
    td2.className = row.status;

    // ===== progress =====
    const td3 = document.createElement("td");
    td3.innerText = row.progress + "%";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tbody.appendChild(tr);
  });

  // ===== KPI =====
  const total = data.length;
  const done = data.filter(x => x.status === "done").length;

  document.getElementById("kpi").innerText =
    `Progress: ${((done / total) * 100).toFixed(1)}%`;

  // ===== chart =====
  new Chart(document.getElementById("chart"), {
    type: "doughnut",
    data: {
      labels: ["Done", "Remaining"],
      datasets: [{
        data: [done, total - done]
      }]
    }
  });
}

function toggleRow(index) {
  const rows = document.querySelectorAll("#table-body tr");
  const level = parseInt(rows[index].dataset.level);

  let i = index + 1;

  while (i < rows.length) {
    const nextLevel = parseInt(rows[i].dataset.level);

    if (nextLevel <= level) break;

    rows[i].classList.toggle("hidden");
    i++;
  }
}

loadData();
