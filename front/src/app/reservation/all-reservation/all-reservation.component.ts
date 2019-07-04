import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-all-reservation',
    templateUrl: './all-reservation.component.html',
    styleUrls: ['./all-reservation.component.css']
})
export class AllReservationComponent implements OnInit,AfterViewInit {

    displayedColumns = ['name','seat', 'startingDate','duration'];
    dataSource = new MatTableDataSource<Reservation>();
    interval: any;
    private reChangedSubscription: Subscription;

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private reservationService: ReservationService) { }

    ngOnInit() {
        this.reChangedSubscription = this.reservationService.reChanged.subscribe(
            (reservations: Reservation[]) => {
                console.log(reservations);

                this.dataSource.data = reservations;
            }
        )
        this.interval = setInterval(()=> {
            this.reservationService.getAllReservations();
        },5000);
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy() {
        this.reChangedSubscription.unsubscribe();
    }

}
