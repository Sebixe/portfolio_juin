import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  quotes: any;
  quoteText: string = "Fais de ta vie un rêve, et d'un rêve, une réalité.";
  author: string = "Antoine de Saint-Exupéry";

 constructor(){}

}
