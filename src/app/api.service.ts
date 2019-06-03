import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { API } from 'src/app/api-config'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' :'application/json',
  })
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: string = API

  constructor(
    private http: HttpClient
  ) { }


  createServant(data:any):Observable<any>{
    return this.http.post(`${this.api}servant/`,data,httpOptions)
  }

  listServants():Observable<any>{
    return this.http.get(`${this.api}servant/`,httpOptions)
  }

  updateServant(data:any, id:any):Observable<any>{
    return this.http.put(`${this.api}servant/${id}`,data,httpOptions)
  }

  deleteServant(id:number):Observable<any>{
    return this.http.delete(`${this.api}servant/${id}`,httpOptions)
  }
}