import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api/api.service';
import { Data } from '../shared/api/data.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

   data: Data[];

  constructor(private apiService: ApiService) {}

    ngOnInit(){
        this.apiService.readData().subscribe((data: Data[])=>{                     // Permet d'observer les données du portfolio stockées sur la DB
          this.data = data;
          console.log(this.data);
      })
    }

}
