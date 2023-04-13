type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export interface RequestBody {
  url: string;
  method: Method;
  body?: any;
  params?: any;
  headers?: { [x: string]: string | number | boolean };
  hashmessage?: string;
  hashField?: string;
  clientSecret?: string;
}
