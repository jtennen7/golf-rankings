// script-schedule.js

// Prompt for API key
let apiKey = sessionStorage.getItem("rapidApiKey");
if (!apiKey) {
  apiKey = prompt("Enter your RapidAPI Key:");
  sessionStorage.setItem("rapidApiKey", apiKey);
}

const searchInput = document.getElementById("searchBar");
const tournamentList = document.getElementById("tournamentList");
let allTournaments = [];

async function fetchTournamentSchedule() {
  const url = 'https://live-golf-data.p.rapidapi.com/schedule?orgId=1&year=2024';
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
    allTournaments = result.schedule || [];
    renderTournaments(allTournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    tournamentList.innerHTML = "<p>\u26A0\uFE0F Failed to load tournaments.</p>";
  }
}

function renderTournaments(tournaments) {
  tournamentList.innerHTML = "";

  if (!tournaments.length) {
    tournamentList.innerHTML = "<p>No tournaments found.</p>";
    return;
  }

  tournaments.forEach(tour => {
    const name = tour.name || "Unnamed Event";
    const start = tour.date?.start?.$date?.$numberLong;
    const end = tour.date?.end?.$date?.$numberLong;
    const startDate = start ? new Date(Number(start)).toLocaleDateString() : "?";
    const endDate = end ? new Date(Number(end)).toLocaleDateString() : "?";

    const purse = tour.purse?.$numberInt;
    const winner = tour.winnersShare?.$numberInt;
    const points = tour.fedexCupPoints?.$numberInt;

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Dates:</strong> ${startDate} to ${endDate}</p>
      ${purse ? `<p><strong>Purse:</strong> $${Number(purse).toLocaleString()}</p>` : ""}
      ${winner ? `<p><strong>Winner's Share:</strong> $${Number(winner).toLocaleString()}</p>` : ""}
      ${points ? `<p><strong>FedEx Cup Points:</strong> ${points}</p>` : ""}
    `;
    tournamentList.appendChild(div);
  });
}

// "Show Me the Money" sorting logic
const moneyBtn = document.createElement("button");
moneyBtn.textContent = "💰 Show Me the Money";
moneyBtn.style.margin = "1rem auto";
moneyBtn.style.display = "block";
moneyBtn.style.padding = "0.5rem 1rem";
moneyBtn.style.background = "#00794f";
moneyBtn.style.color = "white";
moneyBtn.style.border = "none";
moneyBtn.style.borderRadius = "5px";
moneyBtn.style.cursor = "pointer";
moneyBtn.addEventListener("click", () => {
  const sorted = [...allTournaments].sort((a, b) => {
    const purseA = parseInt(a.purse?.$numberInt || 0);
    const purseB = parseInt(b.purse?.$numberInt || 0);
    return purseB - purseA;
  });
  renderTournaments(sorted);
});
document.body.insertBefore(moneyBtn, document.querySelector("main"));

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allTournaments.filter(t =>
    t.name?.toLowerCase().includes(query)
  );
  renderTournaments(filtered);
});

fetchTournamentSchedule();
