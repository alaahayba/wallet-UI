import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class BackEndService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(mobile: any, password: any) {
        return this.http.post<User>(`${environment.apiUrl}/login`,
            { mobile, password })
            .pipe(map(user => {
                console.log(">>>>>>>>>>.", user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }
    transfer(mobile: any, amount: any) {
        var header = {
            headers: new HttpHeaders()
                .set('token', this.userValue.token|| "")
        }
        console.log(">>>>>>>>>>.", mobile, amount, "$$$$$", this.user);
        return this.http.post<any>(`${environment.apiUrl}/user/transaction/execute`,
            { destination : mobile, amount }, header)
            .pipe(map(data => {
                console.log(">>>>>transfer>>>>>.", data)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                return data;
            }));
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        // this.userSubject.next(' ');
        this.router.navigate(['/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/register`, user);
    }

    // getAll() {
    //     return this.http.get<User[]>(`${environment.apiUrl}/users`);
    // }



}