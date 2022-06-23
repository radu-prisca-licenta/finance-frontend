import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = 'https://ceo0djnuaa.execute-api.eu-central-1.amazonaws.com/prod/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User>(this.URL);
  }
}
