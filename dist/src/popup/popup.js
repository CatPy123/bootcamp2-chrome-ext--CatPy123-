// Popup script
// --------------------------------------------------
// Este arquivo roda no contexto do popup (pequena UI que aparece
// quando o usuário clica no ícone da extensão). Ele envia uma
// mensagem simples ao Service Worker para verificar se o processo
// de background está ativo (health check) e exibe o resultado.


const btn = document.getElementById('ping');
const statusEl = document.getElementById('status');

btn.addEventListener('click', async () => {
  // Atualiza a UI imediatamente para feedback
  statusEl.textContent = 'Enviando...';
  try {
    // Envia mensagem para o Service Worker/Background
    const res = await chrome.runtime.sendMessage({ type: 'PING' });

    // Caso o SW responda, atualizamos a UI com o timestamp
    statusEl.textContent = `Background respondeu: ${res.time}`;
  } catch (error) {
    // Possíveis erros:
    // - Service Worker não está ativo/registrado
    // - Permissões ou runtime indisponível
    statusEl.textContent = 'Erro: O background não respondeu.';
    console.error('Erro ao enviar PING para o background:', error);
  }
});