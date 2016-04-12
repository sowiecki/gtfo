export class FileValidationError extends Error {
  constructor(fileName) {
    super(fileName);
    this.name = this.constructor.name;
    this.message = `Invalid ${fileName}.json!
      \nCheck the documentation for how to create and correctly format ${fileName}.json.\n`;
  }
}

export class MissingCoordinatesError extends Error {
  constructor(id) {
    super(id);
    this.name = this.constructor.name;
    this.message = `No coordinates found for ${id}!
      \nBe sure to add an entry to coordinates.json for ${id}.\n`;
  }
}
