//service provide in app.module.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UIService } from'../shared/ui.service';
import 'rxjs/add/operator/toPromise';

//inject route service

interface AccessToken {
    name:string,
    token: string;
}
@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(
        private router: Router,
        private http: HttpClient,
        private uiService: UIService
    ) {}

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            })
        };

        this.user = {
			name: authData.name,
            email: authData.email,
            password: authData.password
        };
        this.http.post<AccessToken>(
            `http://localhost:3000/signup.json`,
            this.user,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.authSuccessfully(result.token, result.name);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
        });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            })
        };
        this.user = {
            name: authData.name,
            email: authData.email,
            password: authData.password
        };
        this.http.post<AccessToken>(
            `http://localhost:3000/login.json`,
            this.user,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.authSuccessfully(result.token, result.name);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
        });
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return <string>localStorage.getItem('accessToken') != null;
    }

    private authSuccessfully(token: string, name: string) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('currentUser', name);
        this.authChange.next(true);
        this.router.navigate(['/reservation']);
    }
}
