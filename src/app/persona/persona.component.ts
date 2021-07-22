import {Component, OnInit} from '@angular/core';
import {Persona} from "../model/persona";
import {PersonaService} from "../service/persona.service";

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  formPersona: Persona = {
    id: "",
    nombre: "",
    fechaNacimiento: ""
  };
  titulo: string = this.formPersona.id != "" ? 'Editar' : 'Registrar';

  constructor(private personasInyectada: PersonaService) {
  }

  ngOnInit(): void {
    this.obtenerAllPersonas();

  }

  obtenerAllPersonas() {
    this.personasInyectada.listarPersonas().subscribe(res => {
      this.personas = res;
    })
  }

  crearPersona() {
    this.personasInyectada.guardarPersona(this.formPersona)
      .subscribe(() => {
        alert(`Persona ${this.titulo} con exito`)
        this.formPersona.id = "";
        location.reload();
      })
  }

  public editarPersona(persona: Persona) {
    this.formPersona = persona;
  }

  public eliminarPersona(idPersona: number | string): any {
    this.personasInyectada.eliminarPersona(idPersona).subscribe((res) => {
      location.reload();
    });
  }
}
