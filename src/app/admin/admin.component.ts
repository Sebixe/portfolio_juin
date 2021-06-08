import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/authentification/authentification.service';
import { ApiService } from '../shared/api/api.service';
import { Data } from '../shared/api/data.model';
import { fromPromise } from 'rxjs/internal-compatibility';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    data = [];
    selectedData: Data = { id : null, date:null, description:null, img:null, imageName:null };
    newData: Data = { id : null, date:null, description:null, img:null, imageName:null };
    cookieValue = null ;

    @ViewChild('myImage') myImage: ElementRef;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private apiService: ApiService, private authentificationService: AuthentificationService, private router: Router) {
  this.cookieValue = this.cookieService.get('Login');
  }

  ngOnInit() {
      this.loadData();
  }

  loadData() {                                                                 // Récupère les données de la DB afin de les afficher sur la page
      this.apiService.readData().subscribe((data: Data[])=>{
          this.data = data;
          console.log(this.data);
      })
  }

  createOrUpdateData(form){                                                   // Permet de créer ainsi que de modifier les données du portfolio
  if(this.cookieValue == '123456789azerty'){                                  // (Nécessite le cookie de Login afin de fonctionner)
      if(this.selectedData && this.selectedData.id){
        form.value.id = this.selectedData.id;
        this.apiService.updateData(form.value).subscribe((data: Data)=>{
          console.log("Data updated" , data);
          this.loadData();
        });
      }else{
        const reader = new FileReader();                                    // Ce morceau de code permet de transformer les images en base 64 afin de les stocker et de les afficher
        reader.readAsDataURL(this.myImage.nativeElement.files[0]);
        reader.onload = () => {

          this.newData.date = this.selectedData.date ;
          this.newData.description = this.selectedData.description ;
          this.newData.img = reader.result as string;
          this.newData.imageName = this.selectedData.img ;

        this.apiService.createData(this.newData).subscribe((newData: Data)=>{
          console.log("Data created, ", newData);
          this.loadData();

        });
      }}
   }else{
      console.log('Non, tu ne peux pas');
   }
}
    selectData(data: Data){                                     // Permet de sélectionner une ligne de données, nécessaire pour l'update
      this.selectedData = data;
    }

    deleteData(id){                                              // Supprime une donnée de la table précisée avec son id (Nécessite le cookie de Login afin de fonctionner)
      if(this.cookieValue == '123456789azerty'){
      this.apiService.deleteData(id).subscribe((data: Data)=>{
        console.log("Données supprimées, ", data);
        this.loadData();
      });
    }else{
      console.log('Non, tu ne peux pas');
    }
  }
}
