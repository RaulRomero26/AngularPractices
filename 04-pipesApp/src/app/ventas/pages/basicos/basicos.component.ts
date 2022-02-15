import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

 nombreLower: string = 'raul';
 nombreUpper: string = 'RAUL';
 nombreCompleto: string = 'rAuL roMeRo';

 fecha: Date = new Date();

}
