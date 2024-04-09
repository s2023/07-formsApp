import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  stock: 6,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0) ] ],
    stock: [0, [ Validators.required, Validators.min(0) ]],
  })
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', []),
  //   price: new FormControl(0),
  //   stock: new FormControl(0),
  // }); v1

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) {}

  ngOnInit(): void {
    // this.myForm.reset( rtx5090 );
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `Minimum ${ errors['minlength'].requiredLength } characters.`;
      }
    }
    return null;
  }

  onSave(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, stock: 0 });
  }

}
