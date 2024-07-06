import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-submitted-data-modal',
  templateUrl: './submitted-data-modal.component.html',
  styleUrls: ['./submitted-data-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule
  ]

})
export class SubmittedDataModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
