import fs from "fs";
import fetch from "node-fetch";

const JSON_URL =
"https://raw.githubusercontent.com/Cricketstan/Allrounder-/refs/heads/main/api/event.json";

const template = fs.readFileSync("src/template.html","utf8");
const data = await (await fetch(JSON_URL)).json();

const cards = data.event.map(e=>`
<div class="poster">
  <img src="${e.poster_link}" alt="${e.title}">
  <div class="overlay">
    <h3>${e.title}</h3>
    <div class="meta">${e.date} • ${e.start_time}</div>
    ${e.watch_now.map(w=>`
      <a class="btn" href="/${w.id}">${w.name}</a>
    `).join("")}
  </div>
</div>
`).join("");

const html = template.replace("{{EVENTS}}",cards);

fs.mkdirSync("dist",{recursive:true});
fs.writeFileSync("dist/index.html",html);
fs.copyFileSync("public/style.css","dist/style.css");

console.log("✅ OTT site built");
