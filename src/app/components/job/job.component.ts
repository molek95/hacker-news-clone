import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UnixTimeToDatePipe } from 'src/app/pipes/unix-time-to-date.pipe';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule, 
    CommonModule, 
    MatButtonModule, 
    UnixTimeToDatePipe
  ]
})
export class JobComponent {
  @Input() by!: string;
  @Input() descendants!: number;
  @Input() id!: number;
  @Input() score!: number;
  @Input() time!: number;
  @Input() title!: string;
  @Input() url!: string;
  @Input() type!: string;

  navigateToUrl(): void {
    window.open(this.url, '_blank')
  }
}
