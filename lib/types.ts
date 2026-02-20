type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ApiEndpoint = `/api/v1/${string}`;
type RequestedEntity = `${HttpMethod} ${ApiEndpoint}`;

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  meta?: Meta;
  error?: boolean;
  requested_entity: RequestedEntity;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
