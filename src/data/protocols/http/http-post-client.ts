import { HttpResponse } from ".";

export type HttpPostParams<T> = {
  url?: string;
  body?: T;
};

export interface HttpPostClient<Params, Response> {
  post(params: HttpPostParams<Params>): Promise<HttpResponse<Response>>;
}
