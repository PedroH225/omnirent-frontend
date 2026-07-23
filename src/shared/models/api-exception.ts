export interface ApiException {
  timestamp: string;
  status: number;
  errorType: string;
  errorCode: string;
  message: string;
  path: string;
}