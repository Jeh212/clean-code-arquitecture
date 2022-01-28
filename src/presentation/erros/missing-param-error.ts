class MissinParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param:${paramName}`);
    this.name = paramName;
  }
}

export { MissinParamError };
