import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggingService } from '../login.service';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LogDetailViewComponent } from './log-detail-view/log-detail-view.component';


@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    LogDetailViewComponent,

  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    LogDetailViewComponent,
    PlaceholderDirective,
    CommonModule,
  ],
  entryComponents: [AlertComponent],
  providers: [LoggingService],
})
export class SharedModule {}
