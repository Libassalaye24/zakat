import { Injectable,OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService implements OnInit{

  constructor() { }

  ngOnInit():void{}

   // Basic Alert
  basicAlert() {
    Swal.fire('Any fool can use a computer')
  }

  withConfirmation(title:string='Are you sure?',text:string="You won't be able to revert this!",confirmButtonText:string='Yes, delete it!',cancelButtonText:string='Cancel') {
   return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    });
  }

  handleMessageSuccesDelete(message:string){
    Swal.fire(
      'Deleted!',
      `${message}`,
      'success'
    )
  }
}
