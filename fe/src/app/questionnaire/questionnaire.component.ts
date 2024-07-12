import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { SubmittedDataModalComponent } from '../submitted-data-modal/submitted-data-modal.component';
import { Question, Questionnaire } from './questionnaire.interface';
import { QuestionnaireService } from './questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm!: FormGroup;
  questionnaire!: Questionnaire;
  questionItems!: Question[];
  subjectType: string[] = [];
  status: string = '';
  submittedFormData: any;

  constructor(
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadQuestionnaire();
  }

  initializeForm(): void {
    this.questionnaireForm = this.fb.group({});
  }

  loadQuestionnaire(): void {
    this.questionnaireService.getQuestionnaire().subscribe(
      (data: Questionnaire) => {
        this.questionnaire = data;
        this.questionItems = data.item;
        this.subjectType = data.subjectType;
        this.status = data.status;
        this.generateFormControls();
      },
      error => {
        console.error('Error loading questionnaire:', error);
      }
    );
  }

  generateFormControls(): void {
    const group: { [key: string]: any } = {};
    this.questionItems.forEach(question => {
      const validators: any[] = [];
      if (question.type === 'boolean') {
        validators.push(this.booleanValidator);
      } else if (question.type === 'choice' && question.item) {
        validators.push(this.choicesValidator(question.item));
      } else if (question.type === 'date') {
        validators.push(this.dateValidator);
      }
      group[question.linkId] = ['', validators];
    });
    this.questionnaireForm = this.fb.group(group);
  }

  choicesValidator(choices: Question[]): ValidatorFn {
    return (control) => {
      const value = control.value;
      if (choices.includes(value)) {
        return null;
      } else {
        return { invalidChoice: true };
      }
    };
  }

  booleanValidator: ValidatorFn = (control) => {
    const value = control.value;
    if (value === true || value === false) {
      return null;
    } else {
      return { invalidBoolean: true };
    }
  };


  dateValidator(control: any) {
    if (!control || !control?.value) {
      return null;
    }
    try {
      const inputDate = new Date(control.value);
      return isNaN(inputDate.getTime()) ? { 'matDatepickerParse': true } : null;
    } catch {
      return null;
    }
  }

  onSubmit(): void {
    if (this.questionnaireForm.valid) {
      const formData = this.questionnaireForm.value;
      this.submittedFormData = this.generateAnswersJson(formData, this.questionItems);
      this.openSubmittedDataModal(this.submittedFormData);
    } else {
      console.log('Form is invalid.');
    }
  }

  isSubmitDisabled(): boolean {
    return this.questionnaireForm.invalid;
  }

  generateAnswersJson(submittedAnswers: any, items: Question[]): any[] {
    const generatedJson: any[] = [];
    const submitTime = new Date();
    items.forEach(item => {
      const linkId = item.linkId;
      const answer = submittedAnswers[linkId];
      const newItem = {
        linkId: item.linkId,
        text: item.text,
        type: item.type,
        submitted: submitTime,
        answer: answer !== undefined ? answer : "N/A"
      };
      generatedJson.push(newItem);
    });
    return generatedJson;
  }


  openSubmittedDataModal(data: any): void {
    this.dialog.open(SubmittedDataModalComponent, {
      width: '500px',
      data: { items: data }
    });
  }
}
