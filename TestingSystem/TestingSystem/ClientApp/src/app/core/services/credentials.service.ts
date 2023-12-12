import { Injectable } from '@angular/core';

export type Credentials = {
  accessToken: string;
  login: string;
  refreshToken: string;
};

@Injectable()
export default class CredentialsService {
  private tokenKey = 'token';

  private loginKey = 'login';

  private refreshTokenKey = 'refreshToken';

  saveCredentials(cred: Credentials) {
    localStorage.setItem(this.tokenKey, cred.accessToken);
    localStorage.setItem(this.loginKey, cred.login);
    localStorage.setItem(this.refreshTokenKey, cred.refreshToken);
  }

  deleteCredentials() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.loginKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  getCredentials(): Credentials {
    return {
      accessToken: localStorage.getItem(this.tokenKey),
      login: localStorage.getItem(this.loginKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey),
    } as Credentials;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getLogin(): string | null {
    return localStorage.getItem(this.loginKey);
  }

  isLoggedIn(): boolean {
    const isLogged: string | null = localStorage.getItem(this.tokenKey);
    return isLogged !== null;
  }
}
