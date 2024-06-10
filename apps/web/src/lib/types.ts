export type GraphQLResponse<T> =
  | { data: T; errors: undefined }
  | { data: undefined; errors: Array<{ message: string }> }
