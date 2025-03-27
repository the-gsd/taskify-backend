export class apiResponse {
  constructor(statusCode = 200, data = {}, message = "success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}
