import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsLogged = false;
  public wrongData: boolean = false;

  constructor(public router: Router, private http: HttpClient) {}

  login(name: any, pass: any) {
    this.http.get<any>('http://localhost:3000/signupUsersList').subscribe({
      next: (res) => {
        const user: boolean = res.find((db: any) => {
          return db.username === name && db.password === pass;
        });
        if (user) {
          this.userIsLogged = true;
          this.router.navigate(['home']);
        } else {
          this.wrongData = true;
        }
      },
      error: (e) => {
        alert('Something went wrong: ' + e);
      },
    });
  }
}
