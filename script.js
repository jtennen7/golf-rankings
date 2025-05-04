document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
  
    // Placeholder data, will fetch API next step
    const samplePlayers = [
      { name: "Scottie Scheffler", rank: 1 },
      { name: "Rory McIlroy", rank: 2 },
      { name: "Jon Rahm", rank: 3 }
    ];
  
    const rankingsContainer = document.getElementById("rankings");
  
    function displayPlayers(players) {
      rankingsContainer.innerHTML = players.map(p => `
        <p><strong>#${p.rank}</strong> - ${p.name}</p>
      `).join('');
    }
  
    displayPlayers(samplePlayers);
  
    searchBar.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = samplePlayers.filter(p => p.name.toLowerCase().includes(query));
      displayPlayers(filtered);
    });
  });
  