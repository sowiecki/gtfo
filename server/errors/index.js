export class FileValidationError extends Error {
  constructor(type) {
    super(type);
    this.message = `Invalid ${type}.json formatting!`;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}
