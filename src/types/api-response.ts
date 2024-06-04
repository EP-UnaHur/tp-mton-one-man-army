type ApiResponse<T> = {
  status:number
  error?: string
  body?: T
}

export default ApiResponse