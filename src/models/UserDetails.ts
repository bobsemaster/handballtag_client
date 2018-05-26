import {Recht} from "./Recht";

export class UserDetails {
  password?: String;
  username: string;
  authorities: Recht[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;

  public static fromJson(json: any): UserDetails {
    if (json == null) {
      return null;
    }
    const userDetails = new UserDetails();
    userDetails.password = json.password;
    userDetails.username = json.username;
    userDetails.authorities = json.authorities;
    userDetails.accountNonExpired = json.accountNonExpired;
    userDetails.accountNonLocked = json.accountNonLocked;
    userDetails.credentialsNonExpired = json.credentialsNonExpired;
    userDetails.enabled = json.enabled;

    return userDetails;
  }

  public hasRecht(recht: String): boolean {
    for (let userRecht of this.authorities) {
      if (recht == userRecht.authority) {
        return true;
      }
    }
    return false;
  }
}
