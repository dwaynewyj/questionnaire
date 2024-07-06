import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Questionnaire } from './questionnaire.interface';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {

    private questionnaireUrl = 'assets/questionnaire.json'; // Adjust path as needed

    constructor(private http: HttpClient) { }

    getQuestionnaire(): Observable<Questionnaire> {
        return this.http.get<Questionnaire>(this.questionnaireUrl);
    }
}
