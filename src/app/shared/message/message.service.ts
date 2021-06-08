import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse } from "@angular/common/http";
import { Contact } from "./contact.model";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

 PHP_API_SERVER = "https://trifiletti.bes-webdeveloper-seraing.be/api";

   constructor(private httpClient: HttpClient) {}

   createContact(contact: Contact): Observable<Contact>{                                        // Permet d'envoyer le formulaire dans la DB "Message"
       return this.httpClient.post<Contact>(`${this.PHP_API_SERVER}/message.php`, contact);
       }
 }
