import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher, Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'Dc Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marverl- Comics'
    }
  ]
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBark: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroePorId( id ))
      )
      .subscribe(heroe => this.heroe = heroe)
  }


  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      this.heroesService.actualizarHeore(this.heroe)
      .subscribe(heroe => this.mostrarSnackbar('Registro Actualizado'));
    }else{
      this.heroesService.agregarHeore(this.heroe)
      .subscribe( heroe => {
       this.router.navigate(['/heroes/editar', heroe.id]);
       this.mostrarSnackbar('Registro Creado');
      })
    }
   
  }

  borrarHeore() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '350px',
      data: this.heroe 
    });

    dialog.afterClosed().subscribe(
      (result) => {
       if (result){
         this.heroesService.borrarHeore( this.heroe.id! )
        .subscribe( resp => {
         this.router.navigate(['/heroes']);
       });
       }
      }
    )

  }

  mostrarSnackbar( mensaje: string ){
    this.snackBark.open(mensaje, 'OK!', {
      duration: 2500
    })
  }
}
