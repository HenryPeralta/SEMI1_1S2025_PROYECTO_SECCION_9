/* eslint-disable camelcase */
import { validateEmail } from '../utils/validateInput.js'
import { comparePassword, hashPassword } from '../utils/bcryptUtils.js'
import { getUserByUsername, createUser } from '../models/authModel.js'

export const loginService = async ({ nombre_usuario, contrasena }) => {
  const user = await getUserByUsername(nombre_usuario)

  if (!user) {
    throw new Error('Error, credenciales invalidas.', {
      cause: { statusCode: 404 }
    })
  }

  const isPasswordValid = await comparePassword(contrasena, user.contrasena)
  if (!isPasswordValid) {
    throw new Error('Error, credenciales invalidas.', {
      cause: { statusCode: 401 }
    })
  }

  return {
    id: user.id,
    nombre_usuario: user.nombre_usuario,
    correo: user.correo,
    imagen_perfil_url: user.imagen_perfil_url,
    fecha_registro: user.fecha_registro,
    fecha_modificacion: user.fecha_modificacion
  }
}

export const registerService = async ({
  nombre_usuario,
  correo,
  contrasena,
  confirmar_contrasena,
  imagen_perfil_url
}) => {
  const user = await getUserByUsername(nombre_usuario)

  if (user) {
    throw new Error('Error, el nombre de usuario ya existe', {
      cause: { statusCode: 409 }
    })
  }

  if (contrasena !== confirmar_contrasena) {
    throw new Error('Error, las contraseñas no coinciden', {
      cause: { statusCode: 400 }
    })
  }

  // Validar que el formateo de correo electronico sea correcto
  if (!validateEmail(correo)) {
    throw new Error('Error, el formato del correo electrónico es incorrecto', {
      cause: { statusCode: 400 }
    })
  }

  const hp = await hashPassword(contrasena)

  const newUser = await createUser({
    nombre_usuario: nombre_usuario,
    correo: correo,
    contrasena: hp,
    imagen_perfil_url: imagen_perfil_url
  })

  if (!newUser) {
    throw new Error('Ocurrio un error al crear el usuario', {
      cause: { statusCode: 500 }
    })
  }

  return {
    id: newUser.id,
    nombre_usuario: newUser.nombre_usuario,
    correo: newUser.correo,
    imagen_perfilUrl: newUser.imagen_perfil_url,
    fecha_registro: newUser.fecha_registro,
    fecha_modificacion: newUser.fecha_modificacion
  }
}
