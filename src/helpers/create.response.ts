export function CreateResponse(data: any, message: string, error?: any): any {
  return {
    data,
    message,
    error: error ? error : null,
  };
}
