# Imagen base de Node.js
FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del dev server de Vite
EXPOSE 5173

# Comando por defecto para correr en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
