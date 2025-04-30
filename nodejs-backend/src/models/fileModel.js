/* eslint-disable camelcase */
import pool from '../config/db.js'

export const getAll = async () => {
  const [rows] = await pool.query(`
    SELECT
      *
    FROM
      Archivos
    ;`)

  return rows.map((row) => {
    return {
      id: row.id,
      usuario_id: row.usuario_id,
      nombre_archivo: row.nombre_archivo,
      tipo_archivo: row.tipo_archivo,
      url_archivo: row.url_archivo,
      fecha_creacion: row.fecha_creacion,
      fecha_modificacion: row.fecha_modificacion
    }
  })
}

export const getFileById = async (id) => {
  const [rows] = await pool.query(
    `
  SELECT
    *
  FROM
    Archivos
  WHERE
    id = ?
  ;`,
    [id]
  )

  if (rows.length === 0) {
    return null
  }

  return {
    id: rows[0].id,
    usuario_id: rows[0].usuario_id,
    nombre_archivo: rows[0].nombre_archivo,
    tipo_archivo: rows[0].tipo_archivo,
    url_archivo: rows[0].url_archivo,
    fecha_creacion: rows[0].fecha_creacion,
    fecha_modificacion: rows[0].fecha_modificacion
  }
}

export const createFile = async (file) => {
  const { usuario_id, nombre_archivo, tipo_archivo, url_archivo } = file

  const [result] = await pool.query(
    `INSERT INTO Archivos
      (usuario_id, nombre_archivo, tipo_archivo, url_archivo)
    VALUES
      (?, ?, ?, ?)
    ;`,
    [usuario_id, nombre_archivo, tipo_archivo, url_archivo]
  )

  if (!result.affectedRows) {
    throw new Error('Error al crear el archivo.')
  }

  return {
    id: result.insertId
  }
}

export const updateFile = async (id, file) => {
  const { usuario_id, nombre_archivo, tipo_archivo, url_archivo } = file

  const [result] = await pool.query(
    `UPDATE Archivos
    SET
      usuario_id = ?, nombre_archivo = ?, tipo_archivo = ?, url_archivo = ?
    WHERE
      id = ?
    ;`,
    [usuario_id, nombre_archivo, tipo_archivo, url_archivo, id]
  )

  if (!result.affectedRows) {
    throw new Error('Error al actualizar el archivo.')
  }

  return {
    affected_rows: result.affectedRows
  }
}

export const deleteFile = async (id) => {
  const [result] = await pool.query('DELETE FROM Archivos WHERE id = ?', [id])

  if (!result.affectedRows) {
    throw new Error('Error al eliminar el archivo.')
  }

  return {
    affectedRows: result.affectedRows
  }
}

export const getAllfilesUserBD = async (id) => {
  const [rows] = await pool.query(`
    SELECT
      *
    FROM
      Archivos
    WHERE
      usuario_id = ?
    ;`,
    [id]
  )

  return rows.map((row) => {
    return {
      id: row.id,
      usuario_id: row.usuario_id,
      nombre_archivo: row.nombre_archivo,
      tipo_archivo: row.tipo_archivo,
      url_archivo: row.url_archivo,
      fecha_creacion: row.fecha_creacion,
      fecha_modificacion: row.fecha_modificacion
    }
  })
}
