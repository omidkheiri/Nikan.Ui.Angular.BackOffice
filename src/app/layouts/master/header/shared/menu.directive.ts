import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[menuHost]',
})
export class MenuDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
