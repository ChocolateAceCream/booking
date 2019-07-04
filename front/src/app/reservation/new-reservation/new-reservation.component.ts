import { Component, OnInit, OnDestroy } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-reservation',
	templateUrl: './new-reservation.component.html',
	styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit, OnDestroy {

    isLoading = false;
    name: string;
    reservationData: Reservation;
    private loadingSubs: Subscription;

    constructor(
        private router: Router,
        private uiService: UIService,
        private reservationService: ReservationService
    ) { }

	ngOnInit() {
		this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
	}

    onSubmit(form: NgForm){
        console.log(form);
        this.name = localStorage.getItem('currentUser');
        this.reservationData = {
            name: this.name,
            seat: form.value.seat,
            date: form.value.startingDate.toString(),
            duration: form.value.duration
        }
        this.reservationService.newReservation(this.reservationData);
        this.router.navigate(['/reservation']);
    }

    ngOnDestroy() {
        if (this.loadingSubs) {
            this.loadingSubs.unsubscribe();
        }
    }

}
