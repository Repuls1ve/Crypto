export interface IPagination<T> {
  totalItems: number
  totalPages: number
  data: T
  pageItems: number
  pageSize: number
  page: number
}

export interface IPaginationParams {
  size: number
  page: number
}