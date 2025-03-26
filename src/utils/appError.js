export class appError extends Error {
  constructor(
    statusCode = 500,
    message = "something went wrong.",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
  }
}
