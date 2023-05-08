import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggingService } from '../login.service';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, PlaceholderDirective],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule,
  ],
  entryComponents: [AlertComponent],
  providers: [LoggingService],
})
export class SharedModule {}
