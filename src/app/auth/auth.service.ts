import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";
import { User } from "./user.model";
import { Preferences } from "@capacitor/preferences";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private activeLogOutTimer: any;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }
  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }
  constructor(private http: HttpClient) {}

  singUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD06sF7qlkjIwCXowUEGZIwkq9F8ZOLW_s",
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD06sF7qlkjIwCXowUEGZIwkq9F8ZOLW_s",
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
  }

  private autoLogOut(duration: number) {
    if (this.activeLogOutTimer) {
      clearTimeout(this.activeLogOutTimer);
    }
    this.activeLogOutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime
    );
    this._user.next(user);
    this.autoLogOut(user.tokenDuration);
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email,
    });

    Preferences.set({ key: "authData", value: data });
  }
}

//sing up
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

//api key AIzaSyD06sF7qlkjIwCXowUEGZIwkq9F8ZOLW_s
