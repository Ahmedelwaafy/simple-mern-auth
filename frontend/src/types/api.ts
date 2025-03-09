export type ApiResponse<T = any> = {
  status: number;
  msg: string;
  data: T;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface EndpointConfig {
  url: string;
  config?: {
    method: HttpMethod;
    headers?: Record<string, string>;
    cache?: RequestCache;
    redirectOnError?: boolean;
    showToasts?: boolean;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    propagateServerError?: boolean;
  };
}
export interface ApiConfigOptions<TResponse = any, TBody = any> {
  params?: Record<string, string | number>;
  query?: Record<string, string>;
  body?: TBody;
  signal?: AbortSignal;
  accessToken?: string;
  onSuccess?: (data: ApiResponse<TResponse>) => void;
  onError?: (error: ApiError) => void;
  next?: {
    tags?: string[];
    revalidate?: number | false;
  };
}

export type ApiError = Error & {
  response?: {
    data: ApiResponse;
  };
};
export type OriginalApiError = {
  statusCode: number;
  message: string;
  error: string;
};
