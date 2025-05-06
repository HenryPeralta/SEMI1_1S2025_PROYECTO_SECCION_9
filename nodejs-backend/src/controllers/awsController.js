import { responseHandler } from '../utils/responseHandler.js'

import {
  synthesizeSpeech,
  translateText,
  sendEmail
} from '../services/awsService.js'

export const index = (_req, res) => {
  responseHandler(res, {
    stringCode: 'WELCOME',
    message: 'Bienvenido al endpoint de aws'
  })
}

// AWS Polly
export const synthesize = async (req, res) => {
  const { text, voiceId, outputFormat } = req.body

  if (!text) {
    return responseHandler(res, {
      status: 'error',
      stringCode: 'ERROR',
      numberCode: 400,
      message: 'El texto es obligatorio para sintetizar el discurso.'
    })
  }

  try {
    const audioStream = await synthesizeSpeech(text, voiceId, outputFormat)
    res.set('Content-Type', 'audio/mpeg')
    res.send(audioStream)
  } catch (error) {
    console.log('Error al sintetizar el discurso:', error)
    responseHandler(res, {
      stringCode: 'ERROR',
      message: 'Error al sintetizar el discurso',
      error
    })
  }
}

// AWS Translate
export const translate = async (req, res) => {
  const { text, targetLanguage } = req.body

  if (!text || !targetLanguage) {
    return responseHandler(res, {
      status: 'error',
      stringCode: 'ERROR',
      numberCode: 400,
      message: 'El texto y el idioma objetivo son obligatorios para traducir.'
    })
  }

  try {
    const translatedText = await translateText(text, targetLanguage)

    console.log('Texto traducido:', translatedText)

    const translatedAudio = await synthesizeSpeech(
      translatedText,
      'Joanna',
      'mp3'
    )

    responseHandler(res, {
      status: 'success',
      stringCode: 'SUCCESS',
      numberCode: 200,
      message: 'Texto traducido con éxito',
      payload: {
        translatedText,
        translatedAudio
      }
    })
  } catch (error) {
    responseHandler(res, {
      stringCode: 'ERROR',
      message: 'Error al traducir el texto',
      error
    })
  }
}

export const translateAndSynthesize = async (req, res) => {
  const {
    text,
    targetLanguage,
    voiceId = 'Joanna',
    outputFormat = 'mp3'
  } = req.body

  if (!text || !targetLanguage) {
    return responseHandler(res, {
      stringCode: 'ERROR',
      message:
        'El texto y el idioma objetivo son obligatorios para esta operación.'
    })
  }

  try {
    // Traducir el texto
    const translatedText = await translateText(text, targetLanguage)

    // Generar el audio del texto traducido
    const audioStream = await synthesizeSpeech(
      translatedText,
      voiceId,
      outputFormat
    )

    // Configurar la respuesta
    res.set('Content-Type', 'application/json')
    res.json({
      translatedText,
      audio: audioStream.toString('base64') // Convertir el audio a base64 para incluirlo en la respuesta
    })
  } catch (error) {
    console.error('Error al traducir y sintetizar:', error)
    responseHandler(res, {
      stringCode: 'ERROR',
      message: 'Error al procesar la solicitud.',
      error
    })
  }
}

export const ses = async (req, res) => {
  const { to, subject, body } = req.body

  if (!to || !subject || !body) {
    return responseHandler(res, {
      status: 'error',
      stringCode: 'ERROR',
      numberCode: 400,
      message:
        'El destinatario, asunto y cuerpo son obligatorios para enviar un correo electrónico.'
    })
  }

  try {
    // Aquí puedes llamar a tu servicio de SES para enviar el correo electrónico
    await sendEmail(to, subject, body)
    responseHandler(res, {
      status: 'success',
      stringCode: 'SUCCESS',
      numberCode: 200,
      message: 'Correo electrónico enviado con éxito',
      payload: {
        to,
        subject,
        body
      }
    })
  } catch (error) {
    console.log('Error al enviar el correo electrónico:', error)
    responseHandler(res, {
      stringCode: 'ERROR',
      message: 'Error al enviar el correo electrónico',
      error
    })
  }
}
