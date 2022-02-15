import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { emailPattern, nombreApellidopattern } from 'src/app/shared/validator/validciones';
import { noPuedSerStrider } from '../../../shared/validator/validciones';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidopattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required,]],
  },{
    validators: [ this.validatorService.camposIguales('password','password2') ]
  }) 

 // emailErrorMsg: string = '';
  
  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?. required ){
      return 'El email es obligatorio'
    } else if ( errors?.pattern ){
      return 'El valor ingresado  no es un email válido'
    } else if ( errors?.emailTomado ){
      return 'El correo electronico ya esta en uso.'
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Raul Romero',
      email: 'test1@test.com',
      username: 'raulrom26',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido (campo: string){
    return this.miFormulario.get(campo)?.invalid 
        && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario () {
    console.log( this.miFormulario.value)

    this.miFormulario.markAllAsTouched();
  }

}
