import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry , take} from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;
  constructor() { 
    
    
    

    // this.retornaObservable()
    // .pipe(
    //   retry()
    // )
    // .subscribe( 
    //   valor => console.log(valor),
    //   error => console.log(error),
    //   () => console.log("Terminado")
    // )

    this.intervalSubs = this.retornaIntervalo()
                            .subscribe( console.log );
  }

  ngOnDestroy(): void{
    this.intervalSubs.unsubscribe();
  }

  // observable que toma solo los primero 4 valores del interval 
  // en el map le suma 1
  // filtra la info dependiendo si se cumple la condición de par
  retornaIntervalo(): Observable<number>{
    return interval(1000)
                      .pipe(
                        map( value => value + 1),
                        filter( value => value % 2 === 0 ),
                        // take(4),
                      );
  }


  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if(i == 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if( i == 2){
          observer.error("Error en el 2");
        }
      },1500);
    });

    return obs$;
  }

}
