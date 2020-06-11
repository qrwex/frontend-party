export type InferApiResult<T extends (...args: any) =>
  Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : never
