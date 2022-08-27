const HttpError = (statusCode: number, message?: string) => ({
  code: statusCode,
  message: message,
})

export { HttpError }
