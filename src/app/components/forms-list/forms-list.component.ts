import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from '../../models/form';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'forms-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.css'
})
export class FormsListComponent {
 @Input() forms$!: Observable<Form[]>;
}
