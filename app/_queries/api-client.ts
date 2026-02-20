// apiClient.ts

import { API_ENDPOINT } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import axios, { AxiosInstance, AxiosError } from "axios";

export class ApiError extends Error {
  statusCode: number | null;
  payload?: ApiResponse<unknown>;
  isCanceled: boolean;

  constructor(
    message: string,
    statusCode: number | null = null,
    payload?: ApiResponse<unknown>,
    isCanceled = false,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.payload = payload;
    this.isCanceled = isCanceled;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000, // 10 seconds timeout
  withCredentials: false, // no cookies by default
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add response interceptor to catch 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export interface ApiClientOptions<
  TData = unknown,
  TParams = Record<string, unknown>,
> {
  method?: "get" | "post" | "put" | "delete" | "patch";
  data?: TData;
  params?: TParams;
  signal?: AbortSignal;
  withCredentials?: boolean; // optional per-request override
}

export async function apiClient<
  TResponse,
  TData = unknown,
  TParams = Record<string, unknown>,
>(
  url: string,
  options?: ApiClientOptions<TData, TParams>,
): Promise<ApiResponse<TResponse>> {
  try {
    const response = await axiosInstance.request<ApiResponse<TResponse>>({
      url,
      method: options?.method ?? "get",
      data: options?.data,
      params: options?.params,
      signal: options?.signal,
      // allow overriding if you ever need to disable or change this
      withCredentials: options?.withCredentials ?? true,
    });

    const respData = response.data;

    if (respData.error) {
      throw new ApiError(respData.message, response.status, respData, false);
    }

    return respData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<unknown>;

      if (axiosErr.code === "ERR_CANCELED") {
        throw new ApiError("Request canceled", null, undefined, true);
      }

      if (axiosErr.response) {
        const resp = axiosErr.response;
        let payload: ApiResponse<unknown> | undefined;
        if (typeof resp.data === "object" && resp.data !== null) {
          payload = resp.data as ApiResponse<unknown>;
        }
        const message =
          (payload?.message as string) ?? resp.statusText ?? "Unknown error";
        throw new ApiError(message, resp.status, payload, false);
      }

      if (axiosErr.request) {
        throw new ApiError("No response from server", null, undefined, false);
      }

      throw new ApiError(axiosErr.message, null, undefined, false);
    }

    if (err instanceof Error) {
      throw new ApiError(err.message, null, undefined, false);
    }

    throw new ApiError(String(err), null, undefined, false);
  }
}
