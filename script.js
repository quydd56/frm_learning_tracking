async function loadData() {
  const res = await fetch("frm_full.json");
  const data = await res.json();

  console.log("Total rows:", data.length);

  // ===== KPI =====
  const total = data.length;
  const done = data.filter(x => x.status === "done").length;

  // ===== Progress chart =====
  const ctx = document.getElementById('progressChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Done', 'Remaining'],
      datasets: [{
        data: [done, total - done]
      }]
    }
  });

  // ===== Progress theo book =====
  const byBook = {};
  data.forEach(x => {
    if (!byBook[x.book]) {
      byBook[x.book] = { total: 0, done: 0 };
    }
    byBook[x.book].total++;
    if (x.status === "done") byBook[x.book].done++;
  });

  console.log("Progress by book:", byBook);
}

loadData();
