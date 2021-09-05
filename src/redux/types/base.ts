export interface BaseRequestStatus {
  loading: boolean;
  success: boolean;
  error: boolean | string;
}
