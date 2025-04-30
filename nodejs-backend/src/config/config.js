process.loadEnvFile()

export const {
  PORT = 8000,
  FRONTEND_URL,
  JWT_SECRET,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306
} = process.env
