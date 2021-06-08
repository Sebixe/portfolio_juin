import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Data } from  './data.model';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "https://trifiletti.bes-webdeveloper-seraing.be/api";

  constructor(private httpClient: HttpClient) {}

  readData() : Observable<Data[]>{                                                  // Lit les données de la DB dans l'Admin et dans la page Portfolio
    return this.httpClient.get<Data[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  createData(data: Data): Observable<Data>{                                        // Crée les données dans la DB sur la page d'Admin
      return this.httpClient.post<Data>(`${this.PHP_API_SERVER}/create.php`, data);
    }

  updateData(data: Data){                                                          // Modifie les données dans la DB sur la page d'Admin
      return this.httpClient.put<Data>(`${this.PHP_API_SERVER}/update.php`, data);
    }

  deleteData(id: number){                                                          // Supprime les données d'une ligne de la DB sur la page d'Admin
      return this.httpClient.delete<Data>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
    }

}
