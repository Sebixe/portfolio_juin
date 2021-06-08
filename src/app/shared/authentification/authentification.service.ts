import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';

@Injectable({
providedIn: 'root'
})

export class AuthentificationService {
    redirectUrl: string;
    baseUrl:string = "https://trifiletti.bes-webdeveloper-seraing.be/api";

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

constructor(private httpClient : HttpClient) { }

// Est appelé par la page d'authentification afin de vérifier que l'adresse mail et le mot de passe sont correctement validés.
// Renvoie également un Token utilisé pour modifier la barres de navigation

  public userlogin(username, password) {
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
       .pipe(map(Users => {
          this.setToken(Users[0].name);
          this.getLoggedInName.emit(true);
            return Users;
        }));
  }

// Est appelé pour ajouter un nouvel administrateur depuis la page Register

  public userregistration(name,email,password) {
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { name,email, password })
      .pipe(map(Users => {
        return Users;
      }));
  }

// Information liées au Token de connexion, permet de le créer, de le récupérer, de le supprimer ainsi que de vérifier s'il est présent

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
      if (usertoken != null) {
        return true
      }
        return false;
  }
}
