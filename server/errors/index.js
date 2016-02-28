export class FileValidationError extends Error {
  constructor(fileName) {
    super(fileName);
    this.name = this.constructor.name;
    this.message = `Invalid ${fileName}.json!
      \nCheck the documentation for how to create and correctly format ${fileName}.json.\n`;
  }
}
