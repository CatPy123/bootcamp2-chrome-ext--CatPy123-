# Usa a imagem oficial do Playwright, que já inclui o Chromium e suas dependências
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app
COPY package*.json ./
# Instala as dependências de forma otimizada
RUN npm ci --silent

COPY . .
# Executa o build da extensão (cria a pasta dist/) DENTRO do container
RUN npm run build

# Comando padrão ao rodar a imagem, será sobrescrito pelo docker-compose.yml
CMD ["npm","test"]