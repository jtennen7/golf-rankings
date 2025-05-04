// script-rankings.js

// Prompt for API key
let apiKey = sessionStorage.getItem("rapidApiKey");
if (!apiKey) {
  apiKey = prompt("Enter your RapidAPI Key:");
  sessionStorage.setItem("rapidApiKey", apiKey);
}

const rankSearch = document.getElementById("rankSearch");
const rankLimit = document.getElementById("rankLimit");
const rankingList = document.getElementById("rankingList");
let allRankings = [];

// Sort control
const sortSelect = document.createElement("select");
sortSelect.id = "sortBy";
sortSelect.innerHTML = `
  <option value="rank">Sort by Rank</option>
  <option value="name">Sort by Name (A-Z)</option>
  <option value="points">Sort by Avg Points (High-Low)</option>
`;
rankSearch.parentNode.appendChild(sortSelect);

async function fetchWorldRankings() {
  const url = 'https://live-golf-data.p.rapidapi.com/stats?year=2024&statId=186';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'live-golf-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    const result = JSON.parse(text);
    allRankings = result.rankings || [];
    renderRankings(allRankings);
  } catch (error) {
    console.error("Error fetching rankings:", error);
    rankingList.innerHTML = "<p>\u26A0\uFE0F Failed to load rankings.</p>";
  }
}

function renderRankings(players) {
  rankingList.innerHTML = "";

  if (!players.length) {
    rankingList.innerHTML = "<p>No ranking data available.</p>";
    return;
  }

  const limit = rankLimit.value;
  let toShow = [...players];

  if (limit !== "all") {
    toShow = toShow.slice(0, parseInt(limit));
  }

  // Apply sorting
  const sortBy = document.getElementById("sortBy").value;
  toShow.sort((a, b) => {
    if (sortBy === "name") {
      return a.fullName.localeCompare(b.fullName);
    } else if (sortBy === "points") {
      return parseFloat(b.avgPoints?.$numberDouble || 0) - parseFloat(a.avgPoints?.$numberDouble || 0);
    } else {
      return parseInt(a.rank?.$numberInt || 999) - parseInt(b.rank?.$numberInt || 999);
    }
  });

  toShow.forEach(p => {
    const rank = p.rank?.$numberInt || "?";
    const name = p.fullName || `${p.firstName} ${p.lastName}`;
    const avgPoints = p.avgPoints?.$numberDouble;
    const events = p.events?.$numberInt;

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>#${rank}</strong> ${name}
      <p>Avg Points: ${parseFloat(avgPoints).toFixed(2)}</p>
      <p>Events Played: ${events}</p>
    `;
    rankingList.appendChild(div);
  });
}

rankSearch.addEventListener("input", () => {
  const query = rankSearch.value.toLowerCase();
  const filtered = allRankings.filter(p =>
    p.fullName?.toLowerCase().includes(query)
  );
  renderRankings(filtered);
});

rankLimit.addEventListener("change", () => {
  const query = rankSearch.value.toLowerCase();
  const filtered = allRankings.filter(p =>
    p.fullName?.toLowerCase().includes(query)
  );
  renderRankings(filtered);
});

sortSelect.addEventListener("change", () => {
  const query = rankSearch.value.toLowerCase();
  const filtered = allRankings.filter(p =>
    p.fullName?.toLowerCase().includes(query)
  );
  renderRankings(filtered);
});

fetchWorldRankings();
