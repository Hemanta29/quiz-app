import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { category, difficulty } from "../models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  quizForm!: FormGroup;
  quizCategory: category[];
  quizDifficulty: difficulty[];
  constructor(private fb: FormBuilder, private router: Router) {
    this.quizCategory = [
      { name: "Movies", code: 11 },
      { name: "Technology", code: 18 },
      { name: "Sports", code: 21 },
      { name: "History", code: 23 },
      { name: "Politics", code: 24 },
      { name: "Mathematics", code: 19 },
    ];
    this.quizDifficulty = [
      {
        label: "Easy",
        value: "easy",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Hard",
        value: "hard",
      },
    ];
  }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      userName: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      difficulty: new FormControl("", Validators.required),
    });
  }

  onSubmit(data: string) {
    sessionStorage.setItem("userSelection", JSON.stringify(data));
    this.router.navigate(["/question"]);
  }

}
