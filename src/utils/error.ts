const error = (statusCode: number, message: string) => {
	return new Error(String(statusCode) + ' ' + message)
}

export { error }
