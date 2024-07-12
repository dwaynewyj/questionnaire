import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuestionnaireComponent } from './questionnaire.component';
import { Questionnaire } from './questionnaire.interface';
import { QuestionnaireService } from './questionnaire.service';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let mockQuestionnaireService: jasmine.SpyObj<QuestionnaireService>;

  const mockQuestionnaire: Questionnaire = {
    resourceType: 'Questionnaire',
    id: 'f201',
    text: { status: 'generated', div: '<div xmlns="http://www.w3.org/1999/xhtml">...</div>' },
    url: 'http://hl7.org/fhir/Questionnaire/f201',
    status: 'active',
    subjectType: ['Patient'],
    date: '2010',
    item: [
      { linkId: '1', text: 'Do you have allergies?', type: 'boolean' },
      {
        linkId: '2',
        text: 'What is your gender?',
        type: 'choice',
        option: [
          { valueCoding: { system: 'http://hl7.fhir/org', code: 'male', display: 'Male' } },
          { valueCoding: { system: 'http://hl7.fhir/org', code: 'female', display: 'Female' } },
          { valueCoding: { system: 'http://hl7.fhir/org', code: 'other', display: 'Other' } }
        ]
      },
      { linkId: '3', text: 'What is your date of birth?', type: 'date' },
      { linkId: '4', text: 'What is your country of birth?', type: 'string' },
      {
        linkId: '5',
        text: 'What is your marital status?',
        type: 'choice',
        option: [
          { valueCoding: { system: 'http://hl7.fhir/org', code: 'married', display: 'Married' } },
          { valueCoding: { system: 'http://hl7.fhir/org', code: 'single', display: 'Single' } },
          { valueCoding: { system: 'http://hl7.fhir/org', code: 'divorced', display: 'Divorced' } }
        ]
      },
      { linkId: '6', text: 'Do you smoke?', type: 'boolean' },
      { linkId: '7', text: 'Do you drink alcohol?', type: 'boolean' }
    ],
    identifier: [],
    code: []
  };

  beforeEach(async () => {
    mockQuestionnaireService = jasmine.createSpyObj('QuestionnaireService', ['getQuestionnaire']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        QuestionnaireComponent,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        MatDialog,
        { provide: QuestionnaireService, useValue: mockQuestionnaireService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    mockQuestionnaireService.getQuestionnaire.and.returnValue(of(mockQuestionnaire));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.questionnaireForm).toBeDefined();
  });

  it('should load questionnaire data', () => {
    expect(component.questionnaire).toEqual(mockQuestionnaire);
    expect(component.questionItems).toEqual(mockQuestionnaire.item);
    expect(component.subjectType).toEqual(mockQuestionnaire.subjectType);
    expect(component.status).toEqual(mockQuestionnaire.status);
  });

  it('should generate form controls for questionnaire items', () => {
    component.generateFormControls();
    mockQuestionnaire.item.forEach(question => {
      expect(component.questionnaireForm.get(question.linkId)).toBeDefined();
    });
  });

  it('should submit form data', () => {
    spyOn(component, 'generateAnswersJson').and.returnValue([]);
    spyOn(component, 'openSubmittedDataModal');

    component.questionnaireForm.patchValue({
      '1': true,
      '2': 'male',
      '3': new Date('1990-01-01'),
      '4': 'Canada',
      '5': 'married',
      '6': false,
      '7': true
    });

    component.onSubmit();
    expect(component.generateAnswersJson).toHaveBeenCalled();
    expect(component.openSubmittedDataModal).toHaveBeenCalled();
  });

  it('should check if submit button is disabled', () => {
    component.ngOnInit();
    component.questionnaireForm = new FormBuilder().group({
      '1': true,
      '2': 'male',
      '3': new Date('1990-01-01')
    });
    expect(component.isSubmitDisabled()).toBeFalse();

    component.questionnaireForm.patchValue({
      '1': null,
      '2': '',
      '3': null
    });

    expect(component.isSubmitDisabled()).toBeFalse();
  });

  describe('dateValidator funciton', () => {
    it('should return null when control value is null', () => {
      let mockInput = { value: null };
      let result = component.dateValidator(mockInput);
      expect(result).toBeNull();
    });

    it('should return null when control value is undefined', () => {
      let mockInput = { value: undefined };
      let result = component.dateValidator(mockInput);
      expect(result).toBeNull();
    });

    it('should throw exception when control value is not a date', () => {
      let mockInput = { value: "test" };
      let result = component.dateValidator(mockInput);
      expect(result).toEqual(jasmine.objectContaining({ 'matDatepickerParse': true }));
    });

    it('should return null when control value is a date string', () => {
      let mockInput = { value: "2024/07/11" };
      let result = component.dateValidator(mockInput);
      expect(result).toBeNull();
    });

    it('should return null when control value is a date string', () => {
      let mockInput = { value: "2024-07-11" };
      let result = component.dateValidator(mockInput);
      expect(result).toBeNull();
    });
  })
});
