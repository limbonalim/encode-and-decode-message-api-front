export interface IFormData {
  encode: string;
  decode: string;
  password: string;
  status: boolean;
}

export interface IMessage  {
  message: string;
  password: string;
}

export interface IApiData {
  url: string;
  message: IMessage;
}

export interface IApiAnswer {
  encoded?: string;
  decoded?: string;
}