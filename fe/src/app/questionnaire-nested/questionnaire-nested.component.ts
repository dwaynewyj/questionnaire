import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { QuestionnaireNested, QuestionNested } from './questionnaire-nested.interface';
import { QuestionnaireNestedService } from './questionnaire-nested.service';

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
  templateUrl: './questionnaire-nested.component.html',
  styleUrls: ['./questionnaire-nested.component.scss']
})

export class QuestionnaireNestedComponent implements OnInit {
  questionnaireForm!: FormGroup;
  questionnaire!: QuestionnaireNested;
  questionItems!: QuestionNested[];
  subjectType: string[] = [];
  status: string = '';
  submittedFormData: any;

  constructor(
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireNestedService,
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
      (data: QuestionnaireNested) => {
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
      if (question.item && question.type === 'group') {
        question.item.forEach(nestedQuestion => {
          const validators: any[] = [];
          if (nestedQuestion.type === 'boolean' || nestedQuestion.type === 'choice') {
            validators.push();
          } else if (nestedQuestion.type === 'date') {
            validators.push(this.dateValidator);
          }
          group[nestedQuestion.linkId] = ['', validators];
        });
      } else {
        const validators: any[] = [];
        if (question.type === 'boolean' || question.type === 'choice') {
          validators.push();
        } else if (question.type === 'date') {
          validators.push(this.dateValidator);
        }
        group[question.linkId] = ['', validators];
      }
    });

    this.questionnaireForm = this.fb.group(group);
  }

  dateValidator(control: any) {
    const inputDate = new Date(control.value);
    return isNaN(inputDate.getTime()) ? { 'matDatepickerParse': true } : null;
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

  generateAnswersJson(submittedAnswers: any, items: QuestionNested[]): any[] {
    const generatedJson: any[] = [];
    const submitTime = new Date();
    items.forEach(item => {
      const linkId = item.linkId;
      const answer = submittedAnswers[linkId];
      if (item?.item && item.type === 'group') {
        item?.item.forEach(nestedQuestion => {
          const nestedAnswer = submittedAnswers[nestedQuestion.linkId];

          const newItem = {
            linkId: nestedQuestion.linkId,
            text: nestedQuestion.text,
            type: nestedQuestion.type,
            submitted: submitTime,
            answer: nestedAnswer !== undefined ? nestedAnswer : "N/A"
          };
          generatedJson.push(newItem);
        });
      } else {
        const newItem = {
          linkId: item.linkId,
          text: item.text,
          type: item.type,
          submitted: submitTime,
          answer: answer !== undefined ? answer : "N/A"
        };
        generatedJson.push(newItem);
      }
    });
    return generatedJson;
  }

  openSubmittedDataModal(data: any[]): void {
    this.dialog.open(SubmittedDataModalComponent, {
      width: '500px',
      data: { items: data }
    });
  }
}
