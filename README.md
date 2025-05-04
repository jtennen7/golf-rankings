# 🏌️ Golf Stats Dashboard

This is a client-side web application that fetches and displays:
- The **2024 PGA Tour schedule**
- The **Official World Golf Rankings (OWGR)**

Built using HTML, CSS, and JavaScript with live data from the Slash Golf API via RapidAPI.

## 🌐 Live Demo
> [🔗 Visit the live site here](https://jtennen7.github.io/golf-rankings/)  

---

## 📁 Pages
- `index.html` — Home page with navigation buttons
- `schedule.html` — Full PGA Tour schedule with purse, FedEx points, and date
- `rankings.html` — Live world rankings with player search and Top 10/25 filters

---

## 🧠 Features
- Dynamic API data fetch using `fetch()`
- Filter/search tournaments and rankings
- Responsive UI design
- API key protection using `sessionStorage`

---

## 🔐 API Key Setup

This app uses the [Live Golf Data API](https://rapidapi.com/slashgolf/api/live-golf-data) from RapidAPI.

### ✅ How to Get Your API Key:
1. Visit: [https://rapidapi.com/slashgolf/api/live-golf-data](https://rapidapi.com/slashgolf/api/live-golf-data)
2. Log in / Sign up on RapidAPI
3. Subscribe to the **Free Plan**
4. Copy your `X-RapidAPI-Key` from the **Endpoints** tab

### 🔑 How to Use:
When you launch the app, you will be prompted to enter your API key. The key is securely stored in session storage and used for all API requests.

> ⚠️ Do not hardcode or commit your key in the source code.

---

## 🚀 Getting Started Locally

1. Clone this repository:
```bash
git clone https://github.com/jtenenn7/golf-ranlings.git
```
2. Open `index.html` in your browser
3. Enter your RapidAPI key when prompted

---

## 🛠️ Tech Stack
- HTML + CSS + JavaScript
- RapidAPI (Slash Golf API)
- GitHub Pages (hosting)

---

## ✍️ Authors
- [JT Ennen](https://github.com/jtennen7)

---

## 📜 License
This project is for educational purposes only. Data is provided via third-party API (RapidAPI/Slash Golf).
