import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { quiz, QuizResolved } from './models';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService implements Resolve<QuizResolved>{

  constructor(private qs: QuizService) {
    console.log("In Route Resolve Service");
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<QuizResolved> {
    const newLocal: any = sessionStorage.getItem("userSelection");
    const value: any = JSON.parse(newLocal);
    return this.qs.getQuizQuestions(value).pipe(
      map((quiz) => ({ Quiz: quiz })),
      catchError(() => {
        return throwError(() => new Error("Something bad happened; please try again later."));
      })
    );
  }
}
