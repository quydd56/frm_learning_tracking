async function loadData() {
  const res = await fetch("data.json");
  const data = await res.json();

  const done = data.filter(x => x.status === "done").length;
  const total = data.length;

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
}

loadData();
