import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QuestionnaireNested } from './questionnaire-nested.interface';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireNestedService {

    private questionnaireUrl = 'assets/questionnaire_nested.json'; // Adjust path as needed

    constructor(private http: HttpClient) { }

    getQuestionnaire(): Observable<QuestionnaireNested> {
        return this.http.get<QuestionnaireNested>(this.questionnaireUrl);
    }
}
