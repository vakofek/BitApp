import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject, of } from 'rxjs';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';

const USERS_KEY = 'users';
const LOGGED_IN_USER = 'loggedInUser';

// Our default DB
const USERS: User[] = [
  {
    _id: 'u101',
    name: 'tair Bitan',
    username: 'tair',
    imgUrl:
      'https://ca.slack-edge.com/T01JRLNVCEA-U01PPC1SGAE-78dd2554dd0f-512',
    coins: 5,
    moves: [],
    password: '1111',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usersDb: User[];

  private _user$: any = new BehaviorSubject(
    this.storageService.load(LOGGED_IN_USER)
  );
  // this is the public updated logged in user
  public user$ = this._user$.asObservable();

  constructor(
    private storageService: StorageService,
    private utilService: UtilService
    ) {}

  loadUsersDB() {
    this._usersDb = this.storageService.load(USERS_KEY) || USERS;
    this.storageService.save(USERS_KEY, this._usersDb);
  }

  login(credentials: { username: string; password: string }) {
    const currUserIdx = this._usersDb.findIndex((user) => {
      return (
        user.username === credentials.username &&
        user.password === credentials.password
      );
    });
    if (currUserIdx !== -1) {
      this.storageService.save(LOGGED_IN_USER, this._usersDb[currUserIdx]);
      this._user$.next(this._usersDb[currUserIdx]);
      return of(this._usersDb[currUserIdx]);
    }
    return of(null);
  }

  logout() {
    this.storageService.save(LOGGED_IN_USER, null);
    this._user$.next(null);
    return of(null);
  }

  signup(user: User) {
    var newUser = { ...user };
    newUser._id = this.utilService.makeId();
    newUser.imgUrl = `https://randomuser.me/api/portraits/${
      Math.random() < 0.5 ? 'men' : 'women'
    }/${this.utilService.getRandomInt(1, 100)}.jpg`;
    this._usersDb.push(newUser);
    this.storageService.save(USERS_KEY, this._usersDb);
    const credentials = {
      username: newUser.username,
      password: newUser.password,
    };
    this.login(credentials);
  }

  updateUser(updateUser: User) {
    this._usersDb = this._usersDb.map((user) =>
      user._id === updateUser._id ? updateUser : user
    );
    this._user$.next(updateUser);
    this.storageService.save(LOGGED_IN_USER, updateUser);
    return of('Updated');
  }

  setMove(move: { coins: number }, userId: string) {
    let updateUser;
    const users = this._usersDb.map((user) => {
      if (user._id === userId) {
        user.coins -= move.coins;
        user.moves.push(move);
        updateUser = user;
      }
      return user;
    });
    this._usersDb = users;
    this.storageService.save(USERS_KEY, this._usersDb);
    this.storageService.save(LOGGED_IN_USER, updateUser);
    this._user$.next(updateUser);
  }

  getLoggedInUser() {
    return this.storageService.load(LOGGED_IN_USER);
  }

  getNewUser() {
    return {
      name: '',
      username: '',
      password: '',
      coins: 0,
      moves: ([] = []),
    };
  }

}
