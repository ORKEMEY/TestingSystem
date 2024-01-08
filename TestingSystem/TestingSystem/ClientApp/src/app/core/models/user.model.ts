import Role from './role.model';
import RefreshToken from './refresh-token.model';

export default class User {
  public id: number;

  public name: string;

  public surname: string;

  public eMail: string;

  public roleId: number;

  public role: Role;

  public refreshToken: RefreshToken;

  constructor(public login: string, public password: string) {}
}
