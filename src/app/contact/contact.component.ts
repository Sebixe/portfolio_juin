import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { MessageService} from "../shared/message/message.service";
import { Contact } from "../shared/message/contact.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact:  Contact[];
  selectedContact: Contact = { id : null, name:null, email:null, message:null };

  constructor( private messageService: MessageService) {}

   ngOnInit(): void{
   }

createContact(form){                                                                                // Permet d'envoyer le formulaire dans la Db où il y est stocké, si l'email est incorrect, cela renvoie une erreur 400
      this.messageService.createContact(form.value).subscribe((contact: Contact)=>{
        console.log("Message créé, ", contact);

      });
    }

}
