import Role from './role.model';
import RefreshToken from './refresh-token.model';

export default class User {
  public Id: number;

  public Name: string;

  public Surname: string;

  public EMail: string;

  public RoleId: number;

  public Role: Role;

  public RefreshToken: RefreshToken;

  constructor(public Login: string, public Password: string) {}
}
