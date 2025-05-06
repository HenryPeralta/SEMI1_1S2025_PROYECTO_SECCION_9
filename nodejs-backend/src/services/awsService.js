import AWS, { SES_SOURCE_EMAIL } from '../config/config.js'

// Polly service
export const synthesizeSpeech = async (
  text,
  voiceId = 'Joanna',
  outputFormat = 'mp3'
) => {
  const polly = new AWS.Polly()
  const params = {
    Text: text,
    OutputFormat: outputFormat,
    VoiceId: voiceId
  }

  try {
    const data = await polly.synthesizeSpeech(params).promise()
    return data.AudioStream
  } catch (error) {
    console.error('Error al sintetizar el discurso:', error)
    throw error
  }
}

// Translate service
export const translateText = async (text, targetLanguage) => {
  const translate = new AWS.Translate()

  const params = {
    Text: text,
    SourceLanguageCode: 'auto',
    TargetLanguageCode: targetLanguage
  }

  try {
    const data = await translate.translateText(params).promise()
    return data.TranslatedText
  } catch (error) {
    console.error('Error al traducir el texto:', error)
    throw error
  }
}

// SES service
export const sendEmail = async (to, subject, body) => {
  const ses = new AWS.SES()

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    },
    Source: SES_SOURCE_EMAIL
  }

  try {
    const result = await ses.sendEmail(params).promise()
    return result
  } catch (error) {
    console.error('Error al enviar el correo:', error)
    throw error
  }
}
