import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Contact } from 'src/app/shared/model/contact.model';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit{

  contacts : Contact[];

  constructor(private contactService: ContactService , private swalService: SwalService){}

  getData() {
    this.contactService.getAll().subscribe((data) => {
      console.log(data);
      this.contacts = data['data'];
    });
  }


  ngOnInit(){
    this.getData();
  }

  delete(id:string){
    this.contactService.delete(id).subscribe(() => {
      // iziToast.success({message: "Project successfully deleted"});
      this.swalService.handleMessageSuccesDelete("Contact successfully deleted.")
      this.getData();
    });
  }

  confirmerSuppression(id:string) {
    
    this.swalService.withConfirmation().then((result) => {
        if(result.value){
          this.delete(id);
        }
    })
  }
}
