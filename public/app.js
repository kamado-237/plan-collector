let currentData = null;
let history = JSON.parse(localStorage.getItem('plantHistory') || '[]');

const API_BASE = 'http://localhost:3000/api/scrape';
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

function quickSearch(name) {
  document.getElementById('plantInput').value = name;
  searchPlant();
}

async function searchPlant() {
  const plant = document.getElementById('plantInput').value.trim();
  if (!plant) return alert('Entrez le nom d\'une plante !');

  hide('result');
  hide('error');
  show('loader');

  try {
    const response = await fetch(`${API_BASE}?plant=${encodeURIComponent(plant)}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Erreur inconnue');

    currentData = data;
    displayResult(data);

  } catch (err) {
    hide('loader');
    show('error');
    document.getElementById('error').textContent = `❌ ${err.message}`;
  }
}

function displayResult(data) {
  hide('loader');

  document.getElementById('plantName').textContent = data.nom;
  document.getElementById('plantDesc').textContent = data.description || 'Aucune description disponible.';
  document.getElementById('formula').textContent = data.formule_moleculaire || 'Non disponible';
  document.getElementById('source').textContent = data.source;
  document.getElementById('collectDate').textContent = `📅 Collecté le : ${new Date(data.date_collecte).toLocaleString('fr-FR')}`;

  const wikiLink = document.getElementById('wikiLink');
  wikiLink.href = data.url_wikipedia || '#';

  const img = document.getElementById('plantImage');
  if (data.image) {
    img.src = data.image;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  show('result');
  renderHistory();
}

function exportJSON() {
  if (!currentData) return;
  const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentData.nom}.json`;
  a.click();
}

function exportCSV() {
  if (!currentData) return;
  const headers = ['Nom', 'Description', 'Formule Moleculaire', 'Source', 'URL Wikipedia', 'Date Collecte'];
  const values = [
    currentData.nom,
    `"${(currentData.description || '').replace(/"/g, "'")}"`,
    currentData.formule_moleculaire || 'N/A',
    currentData.source,
    currentData.url_wikipedia || 'N/A',
    new Date(currentData.date_collecte).toLocaleString('fr-FR')
  ];
  const csv = headers.join(';') + '\n' + values.join(';');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentData.nom}.csv`;
  a.click();
}

function saveToHistory() {
  if (!currentData) return;
  const exists = history.find(h => h.nom === currentData.nom);
  if (!exists) {
    history.unshift({
      nom: currentData.nom,
      date: currentData.date_collecte
    });
    if (history.length > 20) history.pop();
    localStorage.setItem('plantHistory', JSON.stringify(history));
  }
  renderHistory();
  alert(`✅ "${currentData.nom}" sauvegardé dans l'historique !`);
}

function renderHistory() {
  if (history.length === 0) return;
  show('history');
  const list = document.getElementById('historyList');
  list.innerHTML = history.map(h => `
    <div class="history-item">
      <span>🌿 ${h.nom}</span>
      <span>${new Date(h.date).toLocaleDateString('fr-FR')}</span>
    </div>
  `).join('');
}

function clearHistory() {
  history = [];
  localStorage.removeItem('plantHistory');
  hide('history');
}

// Lancer avec Entrée
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('plantInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') searchPlant();
  });
  renderHistory();
});