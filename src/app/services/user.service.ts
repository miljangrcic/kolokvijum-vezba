import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Settings } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  public getUsers() {
    let url = `${Settings.baseURL}/users`;
    return this.http.get<User[]>(url);
  }

  public getUserById(id: number) {
    let url = `${Settings.baseURL}/users/${id}`;
    return this.http.get<User>(url);
  }

  public editUser(user: User) {
    let url = `${Settings.baseURL}/users/${user.id}`;
    return this.http.put<User>(url, user)
  }

  public addUser(user: User) {
    let url = `${Settings.baseURL}/users`;
    return this.http.post<User>(url, user)
  }

  public deleteUserById(id: number) {
    let url = `${Settings.baseURL}/users/${id}`;
    return this.http.delete<User>(url);

  }

  
}
