import { Component,OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Project } from 'src/app/shared/model/project.model';
// import { IziToastService } from 'ngx-izitoast';
import iziToast from 'izitoast';
import { SwalService } from 'src/app/shared/services/swal.service';


import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-campagne-list',
  templateUrl: './campagne-list.component.html',
  styleUrls: ['./campagne-list.component.scss'],
  providers: [DatePipe]
})
export class CampagneListComponent implements OnInit{

  public projects : Project[] = [];
  public statusList : any;
  public typeList : any;
  constructor(private projectService : ProjectService , private datePipe: DatePipe , private swalService: SwalService){}

  getData() {
    this.projectService.getAll().subscribe((data) => {
      console.log(data);
      this.projects = data['data'];
      console.log(this.projects);
      // return data['data'];
    });
  }
  
  delete(id:string){
    this.projectService.delete(id).subscribe(() => {
      // iziToast.success({message: "Project successfully deleted"});
      this.swalService.handleMessageSuccesDelete("Project successfully deleted.")
      this.getData();
    });
  }
  changeStatus(id:string , status:string){
    this.projectService.changeStatus(id,status).subscribe(() => {
      iziToast.success({message: "Project successfully validated"});
      // this.swalService.handleMessageSuccesDelete("Project successfully validated.")
      this.getData();
    });
  }
  ngOnInit() {
     this.getData();
     this.statusList = this.projectService.statusList;
     this.typeList = this.projectService.typeList;
  }

  public selectedStatus : any = "PENDING";
  statusSelected(){
    this.projectService.getByStatus(this.selectedStatus).subscribe((data) => {
      console.log(data);
      this.projects = data['data'];
      console.log(this.projects);
    })
  }
  confirmerSuppression(id:string) {
    
    this.swalService.withConfirmation().then((result) => {
        if(result.value){
          this.delete(id);
          // this.getData();
        }
    })
  }
  confirmerStatusChange(id:string , status:string) {
    
    this.swalService.withConfirmation('Validation','Are you sure you want to validate this project ?','Validate').then((result) => {
        if(result.value){
          this.changeStatus(id,status);
          // this.getData();
        }
    })
  }
}
