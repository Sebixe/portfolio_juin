import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from  '@angular/forms';
import { Router } from  '@angular/router';
import { first } from 'rxjs/operators';
import { AuthentificationService } from  '../shared/authentification/authentification.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
selector: 'app-authentification',
templateUrl: './authentification.component.html',
styleUrls: ['./authentification.component.css']
})

export class AuthentificationComponent implements OnInit {

angForm: FormGroup;

constructor(private cookieService: CookieService, private fb: FormBuilder,private dataService: AuthentificationService,private router:Router) {
  this.angForm = this.fb.group({
    email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
    password: ['', Validators.required]                                                 //Création de la Form angForm utilisée pour la connexion
  });
}

ngOnInit() {
}

postdata(angForm1){                                                                     // Envoi les infos pour la connexion et les compares à celle de la DB, si ça match, il y a connexion
  this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
    .pipe(first())
    .subscribe(
    data => {
      const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/admin';
        this.cookieService.set('Login', '123456789azerty' );                            // Création d'un Cookie qui permet le create, l'update et le delete sur la page d'admin
        this.router.navigate([redirect]);
            },

            error => {
              alert("L'E-mail ou le mot de passe est incorrect.")
                    });
  }

 get email() { return this.angForm.get('E-mail'); }
 get password() { return this.angForm.get('Mot de passe'); }

}
