import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPagination(offset:number,limit:number): Observable<any>{
    return this.http.get<any>(this.baseUrl + 'pokemon/?limit='+limit+'&offset='+offset);
  }

  getPokemon(url:string): Observable<any>{
    return this.http.get<any>(url);
  }

}
