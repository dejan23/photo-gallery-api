/* eslint-disable no-unused-vars */
import { base } from '../config/index.js';
import * as errors from '../utils/errors.util.js';

const { env } = base;

const errorHandler = (err, req, res, next) => {
  let stackTrace;
  let error = err;

  if (env !== 'production') {
    stackTrace = error.stack;
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
