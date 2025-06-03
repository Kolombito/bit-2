"use strict";

const d = document;
const $root = d.getElementById("root");

let cards = `<div class="row g-4">`;

fetch("file.json")
  .then((res) => res.json())
  .then((info) => {
    info.forEach((student) => {
      const username = student.usernameGithub?.trim();
      const hasGithub = username !== "" && username !== undefined;

      const imageUrl = hasGithub
        ? `https://github.com/${username}.png`
        : "https://avatars.githubusercontent.com/u/583231?v=4";

      const githubLink = hasGithub
        ? `<a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-sm">${username}</a>`
        : `<span class="badge bg-secondary">GitHub no disponible</span>`;

      const bitWebsite = student.projects.find(p => p.name === "bit-website")?.score[0] ?? "N/A";

      const bit1Scores = student.projects.find(p => p.name === "bit-1")?.score ?? [];
      let bit1Nota = "N/A";
      if (bit1Scores.length === 1 && bit1Scores[0] <= 5) {
        bit1Nota = bit1Scores[0];
      } else {
        const suma = bit1Scores.reduce((acc, val) => acc + val, 0);
        bit1Nota = (suma / 2).toFixed(2);
      }

      cards += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow border-0">
            <img src="${imageUrl}" alt="Foto de ${student.student}" class="card-img-top" style="object-fit: cover; aspect-ratio: 1 / 1; border-radius: 50%; padding: 1rem; width: 80%; margin: 0 auto;">
            <div class="card-body text-center">
              <h5 class="card-title">${student.student}</h5>
              <p class="card-text"><strong>Intensidad:</strong> ${student.intensity}</p>
              ${githubLink}
              <div class="mt-3">
                <p class="mb-1"><strong>Proyecto 1:</strong> bit-website → Nota: ${bitWebsite}</p>
                <p class="mb-0"><strong>Proyecto 2:</strong> bit-1 → Nota: ${bit1Nota}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    cards += "</div>";
    $root.innerHTML = cards;
  })
  .catch((err) => {
    console.log("Error al cargar el JSON:", err);
  });