FROM node:18

WORKDIR /app

# Copia o package.json e o package-lock.json da pasta anterior
COPY ../package*.json ./

RUN npm install

# Copia o restante dos arquivos da pasta backend
COPY . .

EXPOSE 8080
CMD ["node", "index.js"]
