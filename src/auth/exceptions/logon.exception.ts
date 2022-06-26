export class LogonException extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, LogonException);
  }
}
