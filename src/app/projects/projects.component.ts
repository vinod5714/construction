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
  user_id;
  public projectlist=[];
  
  constructor(private router:Router, private http:Http,private project:ProjectService) { }

  ngOnInit() {
   
    this.currentUser = JSON.parse(localStorage.getItem('Userinfo'));
    console.log(this.currentUser);
    this.user_id = this.currentUser['uid'];
    console.log(this.user_id);
    this.project.getProjectDetails(this.user_id)
    .subscribe(
      data=>{
         console.log(data);
         this.projectlist=data;
         console.log(this.projectlist);
  });
}

}
