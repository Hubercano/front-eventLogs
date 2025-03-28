import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  storedUser:any;

  constructor() {}

  private http = inject(HttpClient)

  register(data:Event) {
    return this.http.post("http://localhost:5000/users/register", data)
  }

  login(data:Event) {
    return this.http.post("http://localhost:5000/users/login", data)
  }

  update(id:string, data:Event) {
    this.storedUser = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string) : null;
    return this.http.put(`http://localhost:5000/users/update/${id}`, data, {
      headers: {Authorization: `Bearer ${this.storedUser.token}`}
    })
  }
}
