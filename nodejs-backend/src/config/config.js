import AWS from 'aws-sdk'
process.loadEnvFile()

export const {
  PORT = 3000,
  FRONTEND_URL,
  JWT_SECRET,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306,
  SES_SOURCE_EMAIL
} = process.env

export default AWS

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
