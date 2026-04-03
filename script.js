async function loadData() {
  const res = await fetch("frm_full.json");
  let data = await res.json();

  // ===== sort để đảm bảo hierarchy =====
  data = data.sort((a, b) => {
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.level - b.level;
  });

  const tbody = document.querySelector("#data-table tbody");

  data.forEach((row, index) => {
    const tr = document.createElement("tr");

    tr.dataset.level = row.level;
    tr.dataset.index = index;

    // ===== topic cell =====
    const tdTopic = document.createElement("td");
    tdTopic.className = "level-" + row.level;

    // chỉ level thấp mới có toggle
    if (row.level <= 2) {
      const toggle = document.createElement("span");
      toggle.innerText = "[+] ";
      toggle.className = "toggle";

      toggle.onclick = () => toggleRow(index);

      tdTopic.appendChild(toggle);
    }

    tdTopic.appendChild(document.createTextNode(row.subtopic));

    // ===== status =====
    const tdStatus = document.createElement("td");
    tdStatus.innerText = row.status;

    // ===== progress =====
    const tdProgress = document.createElement("td");
    tdProgress.innerText = row.progress + "%";

    tr.appendChild(tdTopic);
    tr.appendChild(tdStatus);
    tr.appendChild(tdProgress);

    tbody.appendChild(tr);
  });

  // ===== KPI =====
  const total = data.length;
  const done = data.filter(x => x.status === "done").length;

  document.getElementById("kpi").innerHTML =
    `Done: ${done}/${total} (${((done/total)*100).toFixed(1)}%)`;

  // ===== chart =====
  new Chart(document.getElementById("chart"), {
    type: 'doughnut',
    data: {
      labels: ["Done", "Remaining"],
      datasets: [{
        data: [done, total - done]
      }]
    }
  });
}

// ===== collapse logic =====
function toggleRow(index) {
  const rows = document.querySelectorAll("#data-table tbody tr");
  const current = rows[index];
  const level = parseInt(current.dataset.level);

  let i = index + 1;

  while (i < rows.length) {
    const nextLevel = parseInt(rows[i].dataset.level);

    if (nextLevel <= level) break;

    rows[i].classList.toggle("hidden");
    i++;
  }
}

loadData();
