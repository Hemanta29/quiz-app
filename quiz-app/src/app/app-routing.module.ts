import { ResultComponent } from './result/result.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouteResolverService } from './route-resolver.service';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "question", component: QuizComponent, resolve: { quizQueries: RouteResolverService }, },
  { path: "results", component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
