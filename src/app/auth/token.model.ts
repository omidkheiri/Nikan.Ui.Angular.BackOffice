export interface token {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token:string;
  client_idel_timeout:number,
  scopes: string[];
  roles: string[];
}
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public refresh_token:string,
    public client_idel_timeout:number,
    private scopes: string[],
    private roles: string[]
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
