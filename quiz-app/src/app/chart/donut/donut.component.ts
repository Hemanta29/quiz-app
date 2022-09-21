import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/app-config.service';


interface AppConfig {
  inputStyle?: string;
  dark?: boolean;
  theme?: string;
  ripple?: boolean;
}

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {
  data: any;

  chartOptions: any;

  subscription: Subscription | undefined;

  config: AppConfig | undefined;

  quizAnsweredQueries: any;

  finalScore: number = 0;

  notAnswered: number = 0;

  constructor(private configService: AppConfigService) {

    const newLocal: any = sessionStorage.getItem("quizResults");
    const value: any = JSON.parse(newLocal);
    this.quizAnsweredQueries = value;
    this.quizAnsweredQueries.forEach((quiz: { selectedAnswer: { toString: () => string; }; answer: { toString: () => string; }; }) => {
      if (quiz.selectedAnswer) {
        quiz.selectedAnswer.toString().toLowerCase() ===
          quiz.answer.toString().toLowerCase()
          ? this.finalScore++
          : this.finalScore;
      }
      else {
        this.notAnswered++;
      }
    });
  }

  ngOnInit() {
    this.data = {
      labels: ['Right', 'Not Answered', 'Wrong'],
      datasets: [
        {
          data: [this.finalScore, this.notAnswered, this.quizAnsweredQueries.length - this.finalScore],
          backgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56"
          ]
        }
      ]
    };

    this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
    });
  }

  updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    }
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      }
    }
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem("quizResults");
  }

}
