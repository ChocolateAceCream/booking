import { Reservation } from './reservation.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UIService } from '../shared/ui.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

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
        const ws = webSocket('ws://localhost:3000/cable?access-token='+this.token);
        console.log(ws);
        ws.subscribe(res => {
            if(res.hasOwnProperty("identifier")){
                let temp: any = res;
				if(JSON.parse(temp.identifier).channel=="ReservationChannel"){
                    if(temp.message !== undefined){
                        let data = JSON.parse(temp.message);
                        data.forEach(val => {
                            delete val._id;
                            delete val.user_id;
                        });
                        console.log(data);
                        this.reChanged.next(data);
                    }
                }

            }
                /*
            if(res.identifier.channel=="ReservationChannel"){
                let temp = JSON.parse(res.message);
                let allReservations = [];
                for ( var val in temp){
                    console.log(val);
                    allReservations.push({
                        name: val.name,
                        seat: val.seat,
                        date: val.start,
                        duration: val.duration
                    });
                }
                this.reChanged.next(allReservations);
            };
                 */
        });
        ws.next(
            {"command":"subscribe", "identifier" :"  {\"channel\":\"ReservationChannel\"}"}
        );
    }
    //this.reChanged.next(res);

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
