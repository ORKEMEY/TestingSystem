import Role from './role.model';

export default class User {
  public Id: number;

  public Name: string;

  public Surname: string;

  public EMail: string;

  public RoleId: number;

  public Role: Role;

  public RoleName: string;

  constructor(public Login: string, public Password: string) {}
}
