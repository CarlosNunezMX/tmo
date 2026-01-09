export default interface ActionResponse<T> {
  data: T[],
  ok: boolean,
  error?: string
}
