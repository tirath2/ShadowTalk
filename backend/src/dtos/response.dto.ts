export class ResponseDto<T> {
  status: boolean;
  message: string;
  httpStatusCode: number;
  id?: string;
  errorReason?: string;
  data?: T;

  constructor(
    status: boolean,
    message: string,
    httpStatusCode: number,
    data: T,
    id?: string,
    errorReason?: string,
  ) {
    this.status = status;
    this.message = message;
    this.httpStatusCode = httpStatusCode;
    this.data = data;
    this.id = id;
    this.errorReason = errorReason;
  }

  static success<T>(
    message: string,
    httpStatusCode: number,
    data?: T,
    id?: string,
  ): ResponseDto<T> {
    return new ResponseDto<T>(true, message, httpStatusCode, data, id);
  }

  static failure<T>(
    message: string,
    httpStatusCode: number,
    errorReason?: string,
    data?: T,
    id?: string,
  ): ResponseDto<T> {
    return new ResponseDto<T>(
      false,
      message,
      httpStatusCode,
      data,
      id,
      errorReason,
    );
  }
}
