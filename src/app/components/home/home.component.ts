import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable, map, tap, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}
  subscription: Subscription;

  users = [{ id: 1, name: 'ahmad' }];
  users$: Observable<{ id: number; name: string }[]>;
  ngOnInit(): void {
    this.users$ = of(this.users);
    this.users$.subscribe((user) => {
      console.log(user);
    });
    // let counter = 0;
    // this.subscription = interval(1000).subscribe((data) => {
    //   console.log(counter);
    //   counter++;
    // });
    const customObservable = new Observable((observer) => {
      let counter = 0;
      setInterval(() => {
        // if (counter == 2) {
        //   observer.complete();
        // }
        if (counter > 3) {
          observer.error(new Error('Counter is greater than 3!'));
        }
        observer.next(counter);
        counter++;
      }, 1000);
    });

    /* 
    */
    this.subscription = customObservable
      .pipe(
        map((data) => {
          // console.log('mapped ', data);
          return 'Round : ' + data;
        }),
        tap((data) => {
          console.log(data);
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Completed!');
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
