import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggingService } from '../login.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [CommonModule],
  entryComponents: [],
  providers: [LoggingService],
})
export class SharedModule {}
