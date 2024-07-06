import { HttpClientTestingModule } from '@angular/common/http/testing';
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

import { QuestionnaireNestedComponent } from './questionnaire-nested.component';
import { QuestionnaireNestedService } from './questionnaire-nested.service';

describe('QuestionnaireNestedComponent', () => {
  let component: QuestionnaireNestedComponent;
  let fixture: ComponentFixture<QuestionnaireNestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        QuestionnaireNestedComponent,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        MatDialog,
        QuestionnaireNestedService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireNestedComponent);
    component = fixture.componentInstance;
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
    spyOn(component['questionnaireService'], 'getQuestionnaire').and.returnValue(
      of({
        resourceType: 'Questionnaire',
        id: 'f201',
        text: { status: 'generated', div: '<div xmlns="http://www.w3.org/1999/xhtml">...</div>' },
        url: 'http://hl7.org/fhir/Questionnaire/f201',
        identifier: [{ system: 'urn:ietf:rfc:3986', value: 'urn:oid:2.16.840.1.113883.4.642.20.6' }],
        status: 'active',
        subjectType: ['Patient'],
        date: '2010',
        code: [{ system: 'http://example.org/system/code/lifelines/nl', code: 'VL 1-1, 18-65_1.2.2', display: 'Lifelines Questionnaire 1 part 1' }],
        item: [{
          linkId: '1',
          text: 'Do you have allergies?',
          type: 'boolean'
        }]
      })
    );

    component.loadQuestionnaire();
    expect(component.questionnaire).toBeDefined();
    expect(component.questionItems).toBeDefined();
    expect(component.subjectType).toEqual(['Patient']);
    expect(component.status).toEqual('active');
  });

  it('should generate form controls for questionnaire items', () => {
    component.questionItems = [
      { linkId: '1', text: 'Do you have allergies?', type: 'boolean' },
      {
        linkId: '2',
        text: 'General questions',
        type: 'group',
        item: [
          { linkId: '2.1', text: 'What is your gender?', type: 'string' },
          { linkId: '2.2', text: 'What is your date of birth?', type: 'date' }
        ]
      }
    ];

    component.generateFormControls();
    expect(component.questionnaireForm.get('1')).toBeDefined();
    expect(component.questionnaireForm.get('2.1')).toBeDefined();
    expect(component.questionnaireForm.get('2.2')).toBeDefined();
  });

  it('should submit form data', () => {
    spyOn(component, 'generateAnswersJson').and.returnValue([]);
    spyOn(component, 'openSubmittedDataModal');

    component.questionnaireForm.patchValue({
      '1': true,
      '2.1': 'Male',
      '2.2': new Date('1990-01-01')
    });

    component.onSubmit();
    expect(component.generateAnswersJson).toHaveBeenCalled();
    expect(component.openSubmittedDataModal).toHaveBeenCalled();
  });


});
