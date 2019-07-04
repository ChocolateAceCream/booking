import { Reservation } from './reservation.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UIService } from '../shared/ui.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReservationService {
    token: string;
    reChanged = new Subject<Reservation[]>();
    reservations: Reservation[] = [];
    private reservation: Reservation

    constructor(
        private http: HttpClient,
        private uiService: UIService
    ) {}

    ngOnInit() {
    }

    getAllReservations() {
        this.token = localStorage.getItem('accessToken');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"*",
                'Authorization':`Bearer ${this.token}`
            })
        };
        this.http.get<Reservation[]>(
            `http://localhost:3000/reservations/index.json`,
            httpOptions
        ).toPromise()
        .then((result: Reservation[]) => {
            this.reChanged.next(result);
            this.reservations = result;
        })
        .catch(error => {
        })

    }

    newReservation(reservationData: Reservation) {
        this.token = localStorage.getItem('accessToken');

        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"*",
                'Authorization':`Bearer ${this.token}`
            })
        };
        this.http.post(
            `http://localhost:3000/reservations/create.json`,
            reservationData,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar("Reservation Done",null,5000)
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000)
        })

    }

    cancelReservation() {

    }
}
