import { Component,OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Project } from 'src/app/shared/model/project.model';
// import { IziToastService } from 'ngx-izitoast';
import iziToast from 'izitoast';
import { SwalService } from 'src/app/shared/services/swal.service';
import { FormBuilder, Validators, FormGroup, FormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-campagne-list',
  templateUrl: './campagne-list.component.html',
  styleUrls: ['./campagne-list.component.scss'],
  providers: [DatePipe]
})
export class CampagneListComponent implements OnInit{

  public projects : Project[] = [];
  public filterData : Project[] = [];
  public statusList : any;
  public typeList : any ;
  st:any = '';
  tp:any = '';
  public filter = 
  {
    status : '',
    type : ''
  };
  public addFilters:any = '';
  constructor(private projectService : ProjectService , private datePipe: DatePipe , private swalService: SwalService){

  }

  getData() {
   
    // this.addFilters += this.filter.status ? `?status=${this.filter.status}` : '';
    // this.addFilters += this.filter.type ? `?type=${this.filter.type}` : '';
    this.projectService.getAll().subscribe((data) => {
      console.log(data);
      this.projects = data['data'];
      this.filterData = data['data'];
      console.log(this.projects);
      // return data['data'];
    });
  }
  applyFilter() {
   
    this.filterData = this.projects.filter((item: Project) => {
      console.log(this.filter.type , "sr "+this.filter.status);
      if(this.filter.type && this.filter.status){
        this.st = this.filter.status;
        this.tp = this.filter.type;
        // this.unsetFilters();
        return item.status.toLowerCase().includes(this.st.toLowerCase())
           && item.type.toLowerCase().includes(this.tp.toLowerCase());
      }
      if(this.filter.type){
        return item.type.toLowerCase().includes(this.filter.type.toLowerCase());
      }
     
      if(this.filter.status){
        return item.status.toLowerCase().includes(this.filter.status.toLowerCase());
      }
       
    });
    // if(this.filter.type){
    //     this.projects = this.projects.filter(item => item.type.toLowerCase().includes(this.filter.type.toLowerCase()));
    // }
    // if(this.filter.status){
    //   this.projects = this.projects.filter(item => item.status.toLowerCase().includes(this.filter.status.toLowerCase()));
    // }

    console.log(this.projects);
  }

  delete(id:string){
    this.projectService.delete(id).subscribe(() => {
      // iziToast.success({message: "Project successfully deleted"});
      this.swalService.handleMessageSuccesDelete("Project successfully deleted.")
      this.getData();
    });
  }
  changeStatus(id:string , status:string,etat:string = 'validé'){
    this.projectService.changeStatus(id,status).subscribe(() => {
      iziToast.success({message: `Projet ${etat} avec succès`,position:"topRight"});
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
    
    this.swalService.withConfirmation('Annulation',"Etes-vous sure d'annuler ce projet ?",'OUI','NON').then((result) => {
        if(result.value){
          this.changeStatus(id,status,'annulé');
          // this.getData();
        }
    })
  }
  confirmerStatusChangeValidate(id:string , status:string) {
    
    this.swalService.withConfirmation('Validation',"Etes-vous sure de valider ce projet ?",'OUI','NON').then((result) => {
        if(result.value){
          this.changeStatus(id,status);
          // this.getData();
        }
    })
  }

  unsetFilters(){
    this.filter.status = '';
    this.filter.type = '';
    this.addFilters = "";
    this.filterData = this.projects;
  }
}
