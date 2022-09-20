import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  quizAnsweredQueries: any;
  finalScore: number = 0;

  constructor() {
    const newLocal: any = sessionStorage.getItem("quizResults");
    const value: any = JSON.parse(newLocal);
    console.log(value);
    this.quizAnsweredQueries = value;
    this.quizAnsweredQueries.forEach((quiz: { selectedAnswer: { toString: () => string; }; answer: { toString: () => string; }; }) => {
      if (quiz.selectedAnswer) {
        quiz.selectedAnswer.toString().toLowerCase() ===
          quiz.answer.toString().toLowerCase()
          ? this.finalScore++
          : this.finalScore;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("quizResults");
  }

}
