import { test, expect } from '@playwright/test';
import path from 'node:path';

// Usamos o projeto 'chromium-with-extension' que carrega a extensão
test.use({ project: 'chromium-with-extension' }); 

test('Content Script deve estar ativo em example.com', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Exemplo de verificação: 
  // Se o seu content script injeta um elemento com ID 'ext-injetado'
  const isElementInjected = await page.evaluate(() => {
    return document.getElementById('ext-injetado') !== null;
  });
  
  // Adapte este 'expect' à sua funcionalidade
  expect(isElementInjected).toBe(false); // Altere para 'true' se injetar algo
  
  // Outro exemplo: verifica se a página tem um <title>
  const title = await page.title();
  expect(title).toBe('Example Domain');
});