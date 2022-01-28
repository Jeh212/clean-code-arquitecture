class MissinParamError extends Error {
  constructor(paramName: string) {
    super(`${paramName}`);
    this.name = paramName;
  }
}

export { MissinParamError };
