FROM public.ecr.aws/docker/library/node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Usamos el base /tecnica5/ para consistencia, o podrías usar / si prefieres subdominio
RUN npm run build

FROM public.ecr.aws/docker/library/nginx:stable-alpine

# Copiamos el build a la carpeta que nginx sirve
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración básica de nginx para SPA con subruta
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
