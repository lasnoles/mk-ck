
export type ErrorData = {
    code: number,
    message: string
}

export type ApiError = {
    status: number,
    data?: ErrorData
}