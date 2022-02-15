import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miestra-nombre',
  templateUrl: './miestra-nombre.component.html',
  styles: [
  ]
})
export class MiestraNombreComponent implements OnInit, OnChanges {

  @Input() nombre!:string;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  ngOnInit(): void {
  }

}
