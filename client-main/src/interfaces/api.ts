export type iPayload<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export interface iPaginate {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}
