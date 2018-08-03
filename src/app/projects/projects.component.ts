import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router } from '@angular/router';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {ProjectService} from '../services/project.service';
import {projectlist} from './project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  currentUser;
  public projectlist=[];
  
  constructor(private router:Router, private http:Http,private project:ProjectService) { }



chatdetails(id:number)
{
    
      this.router.navigate(['chatdetails',{id:id}]);
}  

  ngOnInit() {  

    this.project.getProjectDetails()
    .subscribe(
      data=>{
         console.log(data);
         this.projectlist=data;
         console.log(this.projectlist);
  });

}












}
