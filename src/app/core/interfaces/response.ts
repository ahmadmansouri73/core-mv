export interface Response<Data> {
  data: Data
  message: string,
  errors: [],
  status: boolean,
  code: number
}
