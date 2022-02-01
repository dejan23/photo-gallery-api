/* eslint-disable object-curly-newline */
/* eslint-disable max-classes-per-file */
import { codes } from './constants.util.js';

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
      message: message || 'Unauthorized',
      data,
      statusCode: codes.UNAUTHORIZED,
    });
  }
}

class HttpBadRequest extends HttpError {
  constructor(message = null, data = null) {
    super({
      message: message || 'Bad request',
      data,
      statusCode: codes.BAD_REQUEST,
    });
  }
}

class HttpValidationError extends HttpError {
  constructor(message = null, data = null) {
    super({
      message: message || 'Validation error',
      data,
      statusCode: codes.BAD_REQUEST,
    });
  }
}
class HttpNotFound extends HttpError {
  constructor(message = null, data = null) {
    super({
      message: message || 'Not Found',
      data,
      statusCode: codes.NOT_FOUND,
    });
  }
}

class HttpInternalServerError extends HttpError {
  constructor(message = null, data = null) {
    super({
      message: message || 'Internal server error',
      data,
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
