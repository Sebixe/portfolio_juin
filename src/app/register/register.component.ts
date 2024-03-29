import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthentificationService } from  '../shared/authentification/authentification.service';

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    angForm : FormGroup;

constructor(private fb: FormBuilder,private dataService: AuthentificationService,private router:Router) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
}

ngOnInit() {}

postdata(angForm1){
  this.dataService.userregistration(angForm1.value.name,angForm1.value.email,angForm1.value.password)        // Permet d'envoyer les informations de l'administrateur sur la DB, ne fonctionne que si l'email est valide
    .pipe(first())
    .subscribe(
  data => {
    this.router.navigate(['authentification']);
  },

error => {});
}

 get email() { return this.angForm.get('email'); }
 get password() { return this.angForm.get('password'); }
 get name() { return this.angForm.get('name'); }

}
