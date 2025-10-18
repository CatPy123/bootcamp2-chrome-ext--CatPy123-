// Content script
// --------------------------------------------------
// Este script é injetado nas páginas que correspondem
// ao padrão definido em `manifest.json` e aplica um
// estilo de destaque aos links (<a>) conforme as
// preferências armazenadas em chrome.storage.
//
// Entradas / Saídas:
// - Lê configurações de `chrome.storage.sync` (enabled, favoriteColor).
// - Modifica o estilo inline dos elementos <a> na página (side-effect).

// Estado local usado para reaplicar estilos quando necessário.
let currentSettings = {
  enabled: true,
  favoriteColor: '#ec0089'
};

// Aplica ou remove o destaque em todos os links da página.
function applyHighlights(settings) {
  const links = document.querySelectorAll('a');
  for (const link of links) {
    if (settings.enabled) {
      // Aplica um contorno visível com a cor escolhida
      link.style.outline = `2px solid ${settings.favoriteColor}`;
    } else {
      // Remove qualquer contorno que tenhamos aplicado
      link.style.outline = 'none';
    }
  }
}

// Carrega as configurações iniciais (com valores padrão) e aplica
// os destaques imediatamente após a injeção do content script.
chrome.storage.sync.get(currentSettings, (items) => {
  // `items` conterá os valores salvos ou os defaults passados acima.
  currentSettings = items;
  applyHighlights(currentSettings);
});

// Se as configurações mudarem, atualiza-se o estado local e os estilos são reaplicados.
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    currentSettings[key] = newValue;
  }
  applyHighlights(currentSettings);
});