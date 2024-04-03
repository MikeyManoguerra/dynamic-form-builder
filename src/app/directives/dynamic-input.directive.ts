import { Directive, Injector, Input, ViewContainerRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { DomQuestion, getInputComponent } from '../models/question';

// https://stackoverflow.com/q/44181152

// TODO: needs more work to have validator access within each custom form component.
// see the below plunker from above SO post for potential solution.
// Validators still work 'top down,' as in we can tell the form is not valid from the formgroup
// a potential solution would allow us to have access to validators at input level, and provide realtime error feedback

// https://plnkr.co/edit/osU3IUTIvvMkUTyMovmt?p=preview&preview

@Directive({
  selector: '[dynamicInput]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicInputDirective),
      multi: true,
    },
  ],
})
export class DynamicInputDirective {
  @Input('dynamicInput') question!: DomQuestion;

  constructor(
    public injector: Injector,
    private viewContainerRef: ViewContainerRef,
  ) { }

  public ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    const component = getInputComponent(this.question.type);
    const componentRef = this.viewContainerRef.createComponent(component);
    componentRef.instance.question = this.question;
    ngControl.valueAccessor = componentRef.instance;
  }
}
