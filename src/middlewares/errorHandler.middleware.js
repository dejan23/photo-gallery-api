/* eslint-disable no-unused-vars */
import pkg from 'joi';
import { base } from '../config/index.js';
import * as errors from '../utils/errors.util.js';

const { ValidationError } = pkg;
const { env } = base;

const errorHandler = (err, req, res, next) => {
  let stackTrace;
  let error = err;

  if (env !== 'production') {
    stackTrace = error.stack;
  }

  if (error instanceof ValidationError) {
    error = new errors.HttpValidationError(
      error.details[0].message,
      error.details[0],
    );
  }

  if (error?.data?.statusCode === 400) {
    error = new errors.HttpBadRequest(error.data);
  }

  if (!(error instanceof errors.HttpError)) {
    error = new errors.HttpInternalServerError();
  }

  return res.status(error.statusCode).json({
    type: error.constructor.name,
    message: error.message,
    code: error.statusCode,
    data: error.data ?? {},
    error: error.error,
    stackTrace,
  });
};

export default errorHandler;
