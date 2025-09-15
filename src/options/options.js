// Options page script
// --------------------------------------------------
// Este script gerencia a página de opções da extensão. Fornece
// funções para salvar e restaurar preferências usando
// `chrome.storage.sync`.


// Função para salvar as opções no chrome.storage
function saveOptions() {
  const isEnabled = document.getElementById('featureEnabled').checked;
  const color = document.getElementById('highlightColor').value;

  chrome.storage.sync.set(
    { enabled: isEnabled, favoriteColor: color },
    () => {
      // Exibe uma mensagem de confirmação para o usuário
      const status = document.getElementById('status');
      status.textContent = 'Opções salvas!';
      setTimeout(() => {
        status.textContent = '';
      }, 1500);
    }
  );
}

// Função para carregar as opções salvas e exibi-las na página
function restoreOptions() {
  // Define valores padrão caso não exista nada salvo ainda
  chrome.storage.sync.get(
    { enabled: true, favoriteColor: '#ec0089' },
    (items) => {
      document.getElementById('featureEnabled').checked = items.enabled;
      document.getElementById('highlightColor').value = items.favoriteColor;
    }
  );
}

// Adiciona os event listeners: restaura opções ao carregar a página
// e salva quando o usuário clicar no botão "Salvar".
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);