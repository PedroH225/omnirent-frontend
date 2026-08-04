import { FieldError } from "./field-error";

export interface ApiValidationException {
  timestamp: string;
  status: number;
  errorType: string;
  fields: FieldError[];
  errorCode: string;
  message: string;
  path: string;
}