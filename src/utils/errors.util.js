/* eslint-disable object-curly-newline */
/* eslint-disable max-classes-per-file */
import codes from './constants.util.js';

class HttpError extends Error {
  constructor({ message, name, statusCode, data }) {
    super(message);
    this.name = name;
    this.statusCode = statusCode || codes.BAD_REQUEST;
    this.data = data;
    this.error = true;

    Error.captureStackTrace(this, HttpError);
  }
}

class HttpUnauthorized extends HttpError {
  constructor(message = null, data = null) {
    super({
      data,
      message: message || 'Unauthorized',
      statusCode: codes.UNAUTHORIZED,
    });
  }
}

class HttpBadRequest extends HttpError {
  constructor(message = null, data = null) {
    super({
      data,
      message: message || 'Bad request',
      statusCode: codes.BAD_REQUEST,
    });
  }
}

class HttpValidationError extends HttpError {
  constructor(message = null, data = null) {
    super({
      data,
      message: message || 'Validation error',
      statusCode: codes.BAD_REQUEST,
    });
  }
}

class HttpNotFound extends HttpError {
  constructor(message = null, data = null) {
    super({
      data,
      message: message || 'Not Found',
      statusCode: codes.NOT_FOUND,
    });
  }
}

class HttpInternalServerError extends HttpError {
  constructor(message = null, data = null) {
    super({
      data,
      message: message || 'Internal server error',
      statusCode: codes.INTERNAL_SERVER_ERROR,
    });
  }
}

export {
  HttpUnauthorized,
  HttpError,
  HttpBadRequest,
  HttpValidationError,
  HttpNotFound,
  HttpInternalServerError,
};
