/* eslint-disable camelcase */
import pool from '../config/db.js'

export const createTask = async (
  usuario_id,
  titulo,
  descripcion,
  completada = false
) => {
  const [rows] = await pool.query(
    `INSERT INTO Tareas (
      usuario_id,
      titulo,
      descripcion,
      completada
    ) VALUES (?, ?, ?, ?)
    ;`,
    [usuario_id, titulo, descripcion, completada]
  )
  if (rows.affectedRows === 0) {
    throw new Error('No se pudo crear la tarea', {
      cause: { statusCode: 400 }
    })
  }
  return {
    id: rows.insertId,
    usuario_id,
    titulo,
    descripcion,
    completada
  }
}

export const getAll = async () => {
  const [rows] = await pool.query(
    `SELECT
      id,
      usuario_id,
      titulo ,
      descripcion,
      completada,
      fecha_creacion,
      fecha_modificacion
    FROM
      Tareas
    ;`
  )

  if (rows.length === 0) {
    throw new Error('No se encontraron tareas', {
      cause: { statusCode: 404 }
    })
  }

  return rows.map((row) => ({
    id: row.id,
    usuario_id: row.usuario_id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    completada: row.completada,
    fecha_creacion: row.fecha_creacion,
    fecha_modificacion: row.fecha_modificacion
  }))
}

export const getTaskById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      usuario_id,
      titulo,
      descripcion,
      completada,
      fecha_creacion,
      fecha_modificacion
    FROM
      Tareas
    WHERE
      id = ?
    ;`,
    [id]
  )

  if (rows.length === 0) {
    throw new Error(`Tarea con id ${id} no encontrada`, {
      cause: { statusCode: 404 }
    })
  }

  return {
    id: rows[0].id,
    usuario_id: rows[0].usuario_id,
    titulo: rows[0].titulo,
    descripcion: rows[0].descripcion,
    completada: rows[0].completada,
    fecha_creacion: rows[0].fecha_creacion,
    fecha_modificacion: rows[0].fecha_modificacion
  }
}

export const getTaskByUserId = async (usuario_id) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      usuario_id,
      titulo,
      descripcion,
      completada,
      fecha_creacion,
      fecha_modificacion
    FROM
      Tareas
    WHERE
      usuario_id = ?
    ;`,
    [usuario_id]
  )

  if (rows.length === 0) {
    throw new Error(`Tareas del usuario con id ${usuario_id} no encontradas.`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.map((row) => ({
    id: row.id,
    usuario_id: row.usuario_id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    completada: row.completada,
    fecha_creacion: row.fecha_creacion,
    fecha_modificacion: row.fecha_modificacion
  }))
}

export const getTaskByTitle = async (title) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      usuario_id,
      titulo,
      descripcion,
      completada,
      fecha_creacion,
      fecha_modificacion
    FROM
      Tareas
    WHERE
      titulo = ?
    ;`,
    [title]
  )

  if (rows.length === 0) {
    throw new Error(`Tareas con titulo ${title} no encontradas.`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.map((row) => ({
    id: row.id,
    usuario_id: row.usuario_id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    completada: row.completada,
    fecha_creacion: row.fecha_creacion,
    fecha_modificacion: row.fecha_modificacion
  }))
}

export const updateTaskById = async (
  id,
  usuario_id,
  titulo,
  descripcion,
  completada
) => {
  const [rows] = await pool.query(
    `UPDATE Tareas SET
      usuario_id = ?,
      titulo = ?,
      descripcion = ?,
      completada = ?,
      fecha_modificacion = NOW()
    WHERE
      id = ?
    ;`,
    [usuario_id, titulo, descripcion, completada, id]
  )

  if (rows.affectedRows === 0) {
    throw new Error(`Tarea con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.affectedRows
}

export const deleteTaskById = async (id) => {
  const [rows] = await pool.query('DELETE FROM Tareas WHERE id = ?;', [id])

  if (rows.affectedRows === 0) {
    throw new Error(`Tarea con id ${id} no encontrada.`, {
      cause: { statusCode: 404 }
    })
  }

  return rows.affectedRows
}
