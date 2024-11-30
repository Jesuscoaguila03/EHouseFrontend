import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HabitacionService} from '../../services/habitacion.service';
import {HotelService} from '../../services/hotel.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Hotel} from '../../model/hotel';
import {ReseniaService} from '../../services/resenia.service';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../model/usuario';
import {Resenia} from '../../model/resernia';
import {Habitacion} from '../../model/habitacion';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';

@Component({
  selector: 'app-new-resenia',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerModule,//add
    MatNativeDateModule, //add
    MatInputModule,
    MatButton,
    MatSelect,
    MatOption,
    NgForOf,
  ],
  templateUrl: './new-resenia.component.html',
  styleUrl: './new-resenia.component.css'
})
export class NewReseniaComponent {
  reseniaForm: FormGroup;
  fb = inject(FormBuilder);
  reseniaService: ReseniaService = inject(ReseniaService);
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute)
  edicion: boolean = false;

  id: number = 0;
  public idUsuarioSelec: number = 0;
  lista: Usuario[] = [];
  usuario: Usuario = new Usuario();

  constructor() {
    console.log("Constructor ProveedorNuevoEditComponent")
    this.reseniaForm = this.fb.group({
      idResenia: [''],
      puntuacion: ['', [Validators.required, Validators.max(10)]],
      fechaResenia: ['', Validators.required],
      descripcionResenia: ['', Validators.required],
      usuario: ['', Validators.required]
    })
  }

  ngOnInit():void {
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de NewReseniaComponent");
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
      this.loadLista();
    });
  }

  cargarForm() {
    if(this.edicion){
      this.reseniaService.listID(this.id).subscribe((data: Resenia) =>{
        console.log(data);
        this.reseniaForm.patchValue( {
          puntuacion: data.puntuacion,
          fechaResenia: data.fechaResenia,
          descripcionResenia: data.descripcionResenia,
          usuario: data.usuario
        })
      })
    }
  }

  loadLista(): void {
    this.usuarioService.list().subscribe({
      next: (data: Usuario[]) => {
        this.lista = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  onSubmit() {
    if (this.reseniaForm.valid) {
      const resenia: Resenia = new Resenia();
      resenia.idResenia = this.id;
      resenia.puntuacion = this.reseniaForm.value.puntuacion;
      resenia.fechaResenia = this.reseniaForm.value.fechaResenia;
      resenia.descripcionResenia = this.reseniaForm.value.descripcionResenia;
      resenia.usuario = this.usuario;
      resenia.usuario.idUsuario = this.reseniaForm.value.usuario;
      console.log("Producto validado para registrar:", resenia);
      if(!this.edicion){
        console.log("Datos ingresados: ", resenia);
        //suscribe -> asincrono para que no nos bloquee
        this.reseniaService.insert(resenia).subscribe((data: object): void =>{
          console.log("Datos insertados:", data);
        })
      }else{
        console.log("Datos ingresados: ", resenia);
        //suscribe -> asincrono para que no nos bloquee
        this.reseniaService.update(resenia).subscribe((data: Object): void =>{
          console.log("Datos actualizados:", data);
        })
      }
      //this.router.navigate(['resenias']);
    }else {
      console.log("Formulario no valido");
    }
  }
}
