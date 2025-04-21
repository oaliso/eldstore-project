# Etapa de build do Angular
FROM node:18 as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Etapa de produção com Nginx
FROM nginx:alpine

# Copia o nginx.conf customizado
COPY nginx.conf /etc/nginx/nginx.conf

# Copia os arquivos de build Angular (da pasta browser!)
COPY --from=builder /app/dist/eldstore/browser /usr/share/nginx/html

# Porta padrão que o Cloud Run espera
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
