export const responseHandler = (res, { status = 'success', stringCode, numberCode = 200, message, payload = null }) => {
  const response = {
    status, // "success" o "error"
    stringCode, // Ejemplo: "SUCCESS", "INVALID_INPUT", etc.
    numberCode, // Código HTTP (200, 400, 500, etc.)
    message, // Mensaje descriptivo
    payload // Datos devueltos o null
  }

  return res.status(numberCode).json(response)
}
