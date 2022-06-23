import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = 'https://ceo0djnuaa.execute-api.eu-central-1.amazonaws.com/prod/users';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.URL);
  }

  getById(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

  create(user: User) {
    return this.http.post(this.URL, user).subscribe();
  }

  update(user: User) {
    return this.http.put(this.URL + '/' + user.userId, user).subscribe();
  }

  delete(id: string) {
    return this.http.delete(this.URL + '/' + id).subscribe();
  }
}
