import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
  ]
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<string>();
  @Output() typeChanged = new EventEmitter<string>();
  filterForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      titleFilter: [''],
      typeFilter: [''],
    });

    this.filterForm
      .get('titleFilter')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe(value => this.filterChanged.emit(value));

    this.filterForm
      .get('typeFilter')
      ?.valueChanges.subscribe(value => this.typeChanged.emit(value));
  }
}
