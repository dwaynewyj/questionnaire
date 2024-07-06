import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatCardActions, MatCard, MatCardContent, MatCardTitle, MatCardHeader
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  protected links = [
    {
      name: 'Questionnaire',
      url: 'questionnaire',
    },
    {
      name: 'Questionnaire Nsted',
      url: 'questionnaire-nested',
    },
    {
      name: 'GitHub',
      url: 'github',
    }
  ]

  protected cards = [
    {
      title: 'Questionnaire', description: 'Dynamic questionnaire forms and validation solutions', sublinks: [
        { title: "Requirements", link: "https://github.com/smilecdr/playground-basic-task-app" },
        { title: "Example JSON", link: "https://github.com/smilecdr/playground-basic-task-app/blob/main/assets/questionnaire.json" }
      ], route: '/questionnaire', action: "Start"
    },
    {
      title: 'Questionnaire Nested', description: 'Solution for f201 nested questionnaire', sublinks: [
        { title: "Requirements", link: "https://hl7.org/fhir/questionnaire-example-f201-lifelines.html" },
        { title: "Example JSON", link: "https://hl7.org/fhir/questionnaire-example-f201-lifelines.json.html" }
      ], route: '/questionnaire-nested', action: "Start"
    },
    {
      title: 'GitHub', description: "Applicant's repository and sources",
      sublinks: [
        { title: "Material", link: "https://material.angular.io/" },
        { title: "HL7/FHIR", link: "https://hl7.org/fhir/" }
      ],
      url: 'https://github.com/dwaynewyj', action: "Dwayne's GitHub"
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  to(url: string) {
    this.router.navigateByUrl(url);
  }

}
