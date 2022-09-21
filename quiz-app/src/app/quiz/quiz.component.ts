import { Router } from '@angular/router';
import { QuizService } from './../quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quiz, QuizResolved } from '../models';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [ConfirmationService],
})
export class QuizComponent implements OnInit {
  quizQueries: quiz[] = [];
  msgs: Message[] = [];
  position!: string;
  questionNo: number = 0;
  options: any[] = [];
  score: number = 0;
  userName: string = "";
  constructor(private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) {

    const newLocal: any = sessionStorage.getItem("userSelection");
    const value: any = JSON.parse(newLocal);
    console.log(value);
    this.userName = value.userName;
    this.route.data.subscribe((data) => {
      this.quizQueries = data["quizQueries"].Quiz;
      this.options = this.quizQueries[this.questionNo].options;
    });
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {


  }

  nextQuestion() {
    this.questionNo = this.questionNo + 1 > this.quizQueries.length - 1 ? 0 : this.questionNo + 1;
    this.quizQueries[this.questionNo].selectedAnswer;
  }

  prevQuestion() {
    console.log(this.questionNo);
    this.questionNo = this.questionNo - 1 < 0 ? 0 : this.questionNo - 1;
  }

  submitQuiz() {
    let unAnsweredCnt = this.quizQueries.length;
    this.quizQueries.forEach((quiz) => {
      quiz.selectedAnswer ? unAnsweredCnt-- : unAnsweredCnt;
    });
    // console.log(unAnsweredCnt);
    this.confirmationService.confirm({
      message: unAnsweredCnt === 0
        ? "Are you sure to submit your Quiz ?"
        : `Hey! you have ${unAnsweredCnt} unanswered ${unAnsweredCnt === 1 ? "question" : "questions"
        }. Are you sure to Submit ?`,
      header: 'QuizAPP',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        sessionStorage.setItem("quizResults", JSON.stringify(this.quizQueries));
        this.router.navigate(["/results"]);
      },
      reject: () => {
        // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

}
