import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/authentification/authentification.service';
import { ApiService } from '../shared/api/api.service';
import { Data } from '../shared/api/data.model';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    data = [];
    selectedData: Data = { id : null, date:null, description:null, img:null, imageName:null };
    postData: Data = { id : null, date:null, description:null, img:null, imageName:null };
    cookieValue: string;

    @ViewChild('myImage') myImage: ElementRef;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private apiService: ApiService, private authentificationService: AuthentificationService, private router: Router) {}

  ngOnInit() {
      this.cookieValue = this.cookieService.get('Login');
      this.loadData();
  }

  loadData() {
      this.apiService.readData().subscribe((data: Data[])=>{
          this.data = data;
          console.log(this.data);
      })
  }

  createOrUpdateData(form){
    if (this.cookieValue = 'thomas.trifiletti@hotmail.com' || 'jonathan.cambier@gmail.com'){
      if(this.selectedData && this.selectedData.id){
        form.value.id = this.selectedData.id;
        this.apiService.updateData(form.value).subscribe((data: Data)=>{
          console.log("Données mises à jour, " , data);
          this.loadData();
        });
      }
      else{
        this.apiService.createData(form.value).subscribe((data: Data)=>{
          console.log("Données créées, ", data);
        });
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.myImage.nativeElement.files[0]);
      reader.onload = () => {
      this.postData.img = reader.result as string;
      this.postData.imageName = this.selectedData.img;
      this.postData.date = this.selectedData.date;
      this.postData.description = this.selectedData.description;
      this.apiService.createData(this.postData).subscribe();
      console.log('Image en base64', this.postData);
      this.loadData();
      }
    }else{
      console.log("Tu n'as pas le droit.");
    }
  }
    selectData(data: Data){
      this.selectedData = data;
    }

    deleteData(id){
     if (this.cookieValue = 'thomas.trifiletti@hotmail.com'){
      this.apiService.deleteData(id).subscribe((data: Data)=>{
        console.log("Données supprimées, ", data);
        this.loadData();
      });
    }else{
           console.log("Tu n'as pas le droit.");
         }
  }
}

