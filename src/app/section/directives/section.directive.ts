import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSection]'
})
export class SectionDirective {

  @Output() intRateEmit = new EventEmitter();

  constructor(private _el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(e) {
  	let code = e.which || e.keyCode;
  	let name = e.target.name;
    let value = e.target.value;
  	switch (name) {
		case "loanAmount": // Only numbers should not greater than 10 digits
			if(code < 48 || code > 57 || value.length > 7) {
			   e.preventDefault();
			}
			break;
		case "loanDuration": // Only numbers should not greater than 3 digits
			if((code < 48 || code > 57) || (value.length > 2)) {
			   e.preventDefault();
			}
			break;
		default:
			// code...
			break;
    }
  }

  @HostListener('input', ['$event']) onInputChange(e) {
  	let name = e.target.name;
    let value = e.target.value;
    if (name === "intRate") { // Only numbers & decimal should not greater than 100
		let split = value.split(".");
		if ((split.length > 2) || (value > 99) || (value === '')) {
			let event = { name: name, value: 0};
			this.intRateEmit.emit(event);
			// this._el.nativeElement.value = '';
		}
    }
  }
}
