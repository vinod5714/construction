import { Component, OnInit } from '@angular/core';

import { Input, Output, EventEmitter, HostListener } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router } from '@angular/router';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {ChatService} from '../services/chat.service';
import {ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chatdetails',
  templateUrl: './chatdetails.component.html',
  styleUrls: ['./chatdetails.component.css']
})

export class ChatdetailsComponent implements OnInit {

  public chatlist=[];
  id;
  lat;
  lng;
  msg;
  

  url;
formData =new FormData();
  constructor(private router:Router, private activate:ActivatedRoute,private http:Http,private chat:ChatService) { }









  getdetails()
  {    
    this.chat.savedetails(this.lat,this.lng,this.msg,this.id,this.formData)
    .subscribe(
      data=>{
        console.log(data);
          //alert(data);
      }
    );
  }

 

  onSelectFile(event) {




    event.preventDefault();
    let elem= event.target;
     if(elem.files.length > 0)
     {
       //console.log(elem.files[0]);
      
      // console.log(this.id);
       this.formData.append('file' ,elem.files[0]);
       //console.log(formData);
     }





    if (event.target.files && event.target.files[0]) {
    
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;

        //console.log(this.url);
      }      
    }


  }



  ngOnInit() {
	  this.activate.params.subscribe(params=>{
      this.id=params.id;
      //console.log(this.id);
    });



  this.chat.getChatDetails(this.id)
    .subscribe(
      data=>{
         //console.log(data);
         this.chatlist=data; 
	  
  });

  navigator.geolocation.getCurrentPosition((position) => { 
    //console.log("Got position", position.coords);
    this.lat = position.coords.latitude; 
    this.lng = position.coords.longitude;
  });


    }



}
