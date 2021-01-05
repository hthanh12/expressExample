"use strict";

/**
 * HTTP Status codes
 */
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const toResponse = (statusCode, params = {}) => {
  const {
    code = null,
    data = null,
    error = null,
    message = null,
    cpu_time = null,
  } = params;

  if (statusCode >= 200 && statusCode < 400) {
    return {
      status: "success",
      data,
    };}

  if (statusCode >= 400 && statusCode < 500) {
    return {
      status: "error",
      error,
    };
  } else {
    return {
      status: statusCode < 500 ? "fail" : "error",
      code,
      data,
      message,
      error,
    };
  }
};

/**
 * Utility Class to easily make ExpressJS Response
 */
class Response {
  static get STATUS_CODES() {
    return STATUS_CODES;
  }

  //  OK: 200
  static success(res, params = {}) {
    let status = params.statusCode || res.statusCode;
    if (status >= 400) {
      status = this.STATUS_CODES.OK;
    }
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static fail(res, params = {}) {
    let status = params.statusCode || res.statusCode;
    if (status < 400 || status >= 500) {
      status = this.STATUS_CODES.BAD_REQUEST;
    }
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static error(res, params = {}) {
    let status = params.statusCode || res.statusCode;
    if (status < 500) {
      status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;
    }
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static ok(res, params = {}) {
    let status = this.STATUS_CODES.OK;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static created(res, params = {}) {
    let status = this.STATUS_CODES.CREATED;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }


  static noContent(res, params = {}) {
    let status = this.STATUS_CODES.NO_CONTENT;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static badRequest(res, params = {}) {
    let status = this.STATUS_CODES.BAD_REQUEST;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static unauthorized(res, params = {}) {
    let status = this.STATUS_CODES.UNAUTHORIZED;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static forbidden(res, params = {}) {
    let status = this.STATUS_CODES.FORBIDDEN;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static notFound(res, params = {}) {
    let status = this.STATUS_CODES.NOT_FOUND;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static requestTimeout(res, params = {}) {
    let status = this.STATUS_CODES.REQUEST_TIMEOUT;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static conflict(res, params = {}) {
    let status = this.STATUS_CODES.CONFLICT;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }

  static internalServerError(res, params = {}) {
    let status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;
    let body = toResponse(status, params);
    return res.status(status).json(body);
  }
}

module.exports = Response;
