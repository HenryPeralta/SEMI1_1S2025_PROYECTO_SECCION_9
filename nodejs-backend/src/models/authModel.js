/* eslint-disable camelcase */
import pool from '../config/db.js'

// Obtener un usuario por medio de su nombre de usuario
export const getUserByUsername = async (nombre_usuario) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      nombre_usuario,
      correo,
      contrasena,
      imagen_perfil_url,
      fecha_registro,
      fecha_modificacion
    FROM
      Usuarios
    WHERE
      nombre_usuario = ?
    ;`,
    [nombre_usuario]
  )

  if (rows.length === 0) {
    return null
  }

  return {
    id: rows[0].id,
    nombre_usuario: rows[0].nombre_usuario,
    correo: rows[0].correo,
    contrasena: rows[0].contrasena,
    imagen_perfil_url: rows[0].imagen_perfil_url,
    fecha_registro: rows[0].fecha_registro,
    fecha_modificacion: rows[0].fecha_modificacion
  }
}

export const createUser = async ({
  nombre_usuario,
  correo,
  contrasena,
  imagen_perfil_url
}) => {
  const [rows] = await pool.query(
    `INSERT INTO Usuarios
      (nombre_usuario, correo, contrasena, imagen_perfil_url)
    VALUES
      (?, ?, ?, ?)
    ;`,
    [nombre_usuario, correo, contrasena, imagen_perfil_url]
  )

  if (rows.affectedRows === 0) {
    throw new Error('Error al crear el usuario', { cause: { statusCode: 500 } })
  }

  return {
    id: rows.insertId,
    nombre_usuario,
    correo,
    imagen_perfil_url
  }
}
