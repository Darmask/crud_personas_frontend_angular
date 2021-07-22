import {Injectable} from '@angular/core';
import {url as urlDev} from "../config/server";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Persona} from "../model/persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  urlPersonas = `${urlDev}/personas`

  constructor(private http: HttpClient) {
  }

  public listarPersonas(): Observable<Persona[]> {
    console.log(this.urlPersonas)
    return this.http.get<Persona[]>(this.urlPersonas);
  }

  public guardarPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.urlPersonas, persona);
  }

  public eliminarPersona(idUsuario: number | string | undefined): Observable<any> {
    return this.http.delete(`${this.urlPersonas}/${idUsuario}`);
  }
}
