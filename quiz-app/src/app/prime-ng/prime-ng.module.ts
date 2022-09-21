import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SelectButtonModule } from "primeng/selectbutton";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from "primeng/paginator";
import { FieldsetModule } from "primeng/fieldset";
import { RadioButtonModule } from "primeng/radiobutton";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { ChartModule } from 'primeng/chart';



export const primeNgComponents = [
  InputTextModule,
  DropdownModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  SelectButtonModule,
  ButtonModule,
  PaginatorModule,
  FieldsetModule,
  RadioButtonModule,
  ConfirmDialogModule,
  DialogModule,
  DynamicDialogModule,
  VirtualScrollerModule,
  CardModule,
  MessagesModule,
  ChartModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [primeNgComponents],
})
export class PrimeNgModule { }
