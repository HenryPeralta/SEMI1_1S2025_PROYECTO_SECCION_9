/* eslint-disable camelcase */
import pool from '../config/db.js'

export const getAll = async () => {
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
    ;`
  )

  if (rows.length === 0) {
    throw new Error('No se encontraron usuarios', {
      cause: { statusCode: 404 }
    })
  }

  return rows.map((row) => ({
    id: row.id,
    nombre_usuario: row.nombre_usuario,
    correo: row.correo,
    contrasena: row.contrasena,
    imagen_perfil_url: row.imagen_perfil_url,
    fecha_registro: row.fecha_registro,
    fecha_modificacion: row.fecha_modificacion
  }))
}

// Obtener un usuario por medio de su nombre de usuario
export const getUserById = async (id) => {
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
      id = ?
    ;`,
    [id]
  )

  if (rows.length === 0) {
    throw new Error(`Usuario con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
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

export const getUserByEmail = async (correo) => {
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
      correo = ?
    ;`,
    [correo]
  )

  if (rows.length === 0) {
    throw new Error(`Usuario con correo ${correo} no encontrado`, {
      cause: { statusCode: 404 }
    })
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
    throw new Error(
      `Usuario con nombre de usuario ${nombre_usuario} no encontrado`,
      {
        cause: { statusCode: 404 }
      }
    )
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

export const updateUser = async (id, correo, contrasena, imagen_perfil_url) => {
  const [rows] = await pool.query(
    `UPDATE Usuarios SET
      correo = ?,
      contrasena = ?,
      imagen_perfil_url = ?,
      fecha_modificacion = NOW()
    WHERE
      id = ?
    ;`,
    [correo, contrasena, imagen_perfil_url, id]
  )

  if (rows.affectedRows === 0) {
    throw new Error(`Usuario con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.affectedRows
}

export const deleteUserByUsername = async (nombre_usuario) => {
  const [rows] = await pool.query(
    'DELETE FROM Usuarios WHERE nombre_usuario = ?;',
    [nombre_usuario]
  )

  if (rows.affectedRows === 0) {
    throw new Error(`Usuario con username ${nombre_usuario} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.affectedRows
}

export const deleteUserByEmail = async (correo) => {
  const [rows] = await pool.query('DELETE FROM Usuarios WHERE correo = ?;', [
    correo
  ])

  if (rows.affectedRows === 0) {
    throw new Error(`Usuario con email ${correo} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.affectedRows
}

export const deleteUserById = async (id) => {
  const [rows] = await pool.query('DELETE FROM Usuarios WHERE id = ?;', [id])

  if (rows.affectedRows === 0) {
    throw new Error(`Usuario con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.affectedRows
}
