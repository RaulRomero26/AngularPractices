import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-coumnes',
  templateUrl: './no-coumnes.component.html',
  styles: [
  ]
})
export class NoCoumnesComponent  {

  nombre: string = 'Raúl';
  genero: string = 'masculino';

  invitacionMapa = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }

  clientes: string[] = ['María','Pedro','Juan','Fernando','Eduardo'];

  clientesMapa = {
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    'other': 'tenemos # clientes esperando'
  }

  cambiarCliente(){
    if( this.genero === 'masculino'){
      this.genero = 'femenino';
      this.nombre = 'Susana';
    } else {
      this.genero = 'masculino';
      this.nombre = 'Raúl'
    }
  }

  borrarCliente(){
    this.clientes.pop();
  }

  persona = {
    nombre: 'Raúl',
    edad: 24,
    direccion: 'Puebla, México'
  }

  heroes = [
    {
      nombre: 'Superman',
      vuela: true,
    },
    {
      nombre: 'Robin',
      vuela: false,
    },
    {
      nombre: 'Acuaman',
      vuela: false,
    }
  ]

  miObservable = interval(5000);

  valorPromesa = new Promise((resolve, reject) => {
      
    setTimeout(() =>{
      resolve('Tenemos data de la promesa')
    }, 3500);
  });

}
