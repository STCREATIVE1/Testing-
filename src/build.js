import fs from "fs";
import fetch from "node-fetch";

const JSON_URL =
  "https://raw.githubusercontent.com/Cricketstan/Allrounder-/refs/heads/main/api/event.json";

const template = fs.readFileSync("src/template.html", "utf8");

const res = await fetch(JSON_URL);
const data = await res.json();

const cards = data.event.map(e => `
<div class="card">
  <img src="${e.poster_link}" alt="${e.title}">
  <div class="card-content">
    <h3>${e.title}</h3>
    <div class="meta">${e.date} • ${e.start_time}</div>
    <div class="meta">${e.league} • ${e.language}</div>

    <div class="buttons">
      ${e.watch_now.map(w =>
        `<a href="/${w.id}">${w.name}</a>`
      ).join("")}
    </div>
  </div>
</div>
`).join("");

const output = template.replace("{{EVENTS}}", cards);

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.html", output);
fs.copyFileSync("public/style.css", "dist/style.css");

console.log("✅ Static site generated");
