import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Data } from  './data.model';
import { Observable } from  'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "../api";

  constructor(private httpClient: HttpClient) {}

  readData() : Observable<Data[]>{
    return this.httpClient.get<Data[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  createData(data: Data): Observable<Data>{

      return this.httpClient.post<Data>(`${this.PHP_API_SERVER}/create.php`, data);
    }

  updateData(data: Data){
      return this.httpClient.put<Data>(`${this.PHP_API_SERVER}/update.php`, data);
    }

  deleteData(id: number){
      return this.httpClient.delete<Data>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
    }

}
