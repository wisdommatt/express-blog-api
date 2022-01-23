//  StatusCodes contains the http status codes
// used in the rest api route handlers.
export enum StatusCodes {
    StatusOK = 200,

    StatusTemporaryRedirect = 307,
    StatusPermanentRedirect = 308,

    StatusBadRequest = 400,
    StatusUnauthorized = 401,
    StatusForbidden = 403,
    StatusNotFound = 404,
    StatusMethodNotAllowed = 405,

    StatusInternalServerError = 500,
    StatusBadGateway = 502,
    StatusServiceUnavailable = 503,
    StatusGatewayTimeout = 504,
}

export enum ResponseStatus {
    Error = "error",
    Success = "success",
}