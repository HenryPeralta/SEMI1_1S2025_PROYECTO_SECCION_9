/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'
import { responseHandler } from '../utils/responseHandler.js'
import { loginService, registerService } from '../services/authService.js'

export const index = (_req, res) =>
  responseHandler(res, {
    stringCode: 'WELCOME',
    message: 'Bienvenido a la API de autenticación'
  })

export const login = async (req, res) => {
  try {
    const user = await loginService(req.body)

    const { id, nombre_usuario, correo, imagen_perfil_url } = user
    const payload = { id, nombre_usuario, correo, imagen_perfil_url }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

    return responseHandler(res, {
      stringCode: 'LOGIN_SUCCESS',
      message: 'Inicio de sesión exitoso',
      payload: { token, id }
    })
  } catch (error) {
    const { message, cause } = error
    return responseHandler(res, {
      status: 'error',
      stringCode: 'LOGIN_FAILED',
      numberCode: cause?.statusCode ? cause.statusCode : 400,
      message
    })
  }
}

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body)
    return responseHandler(res, {
      stringCode: 'REGISTER_SUCCESS',
      numberCode: 201,
      message: 'Registro exitoso',
      payload: { ...user }
    })
  } catch (error) {
    const { message, cause } = error
    return responseHandler(res, {
      status: 'error',
      stringCode: 'REGISTER_FAILED',
      numberCode: cause?.statusCode ? cause.statusCode : 400,
      message
    })
  }
}
