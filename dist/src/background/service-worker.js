// Service Worker (Manifest V3)
// --------------------------------------------------
// Este arquivo atua como o processo de background da
// extensão (Service Worker). Ele escuta eventos do
// ciclo de vida da extensão e mensagens vindas do popup
// ou de outros scripts. 
//
// Ao instalar/atualizar a extensão definimos configurações
// iniciais para que o conteúdo da página saiba como se
// comportar (ex.: destacar links).
chrome.runtime.onInstalled.addListener(() => {
  console.log('Bootcamp Helper instalado.');

  // Define valores padrão na instalação. 
  chrome.storage.sync.set({
    enabled: true, // indica se a funcionalidade principal está ativa
    favoriteColor: '#ec0089' // cor usada para destaque
  });
});

// Escuta mensagens enviadas por outros scripts (popup, content, etc.).
// Protocolo simples: { type: 'PING' } -> respondemos com carimbo de tempo.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'PING') {
    sendResponse({ ok: true, time: new Date().toISOString() });
  }
});