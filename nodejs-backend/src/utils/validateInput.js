/**
 * Esta función valida que el formato del correo electronico sea correcto.
 * @param {*} email
 * @returns boolean
 */
export const validateEmail = (email) => {
  // Expresión regular para validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Verifica si el correo electrónico cumple con el formato
  return emailRegex.test(email)
}

/**
 * Esta función valida que la fecha venga en el formato dd/MM/yyyy.
 * @param {*} date - Fecha a validar
 * @returns boolean
 */
export const verifyDateFormat103 = (date) => {
  // Expresion regular para validar que le fecha venga en formato dd/MM/yyyy
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
  // Verifica si la fecha cumple con el formato
  return dateRegex.test(date)
}
