# Usar una imagen base de Node.js
FROM node:22

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000
EXPOSE 8000

# Comando por defecto para iniciar el servidor
CMD ["node", "src/server.js"]