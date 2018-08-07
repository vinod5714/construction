import { Component, OnInit, Inject } from '@angular/core';
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
  project_id;
  user_id;
  lat;
  lng;
  msg;
  image;
  currentUser;
  Response;
  
   
  



formData =new FormData();
  constructor(private router:Router, private activate:ActivatedRoute,private http:Http,private chat:ChatService) { }

onSelectFile(event) 
{
    event.preventDefault();
    let elem= event.target;
    
     if(elem.files.length > 0)
     {
       //console.log(elem.files[0]);
      
      // console.log(this.id);
       this.formData.append('file' ,elem.files[0]);
       //console.log(this.formData);
     }
      if (event.target.files && event.target.files[0]) 
      {
          
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event:Event) => { // called once readAsDataURL is completed
              this.image = reader.result;
             // console.log(this.image);
            }      
      }


  }

  saveChat()
  {

    this.currentUser=JSON.parse(localStorage.getItem('Userinfo'));
    this.user_id=this.currentUser['uid'];
   


      //this.formData.append('file', this.image);
      this.formData.append('uid', this.user_id);
      this.formData.append('pid',this.project_id);
      this.formData.append('lat', this.lat);
      this.formData.append('lng', this.lng);
      this.formData.append('msg', this.msg);




    this.chat.saveChatDetails(this.formData)
    .subscribe(
      data=>{
        console.log(data);
          this.Response=data.status;
         
      }
    );
  }
  pictureSource:any;
  destinationType:any;
  
  openCamera()
  {
    let navigator:any;
    console.log("take picture");
    navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { 
    quality: 50, 
    sourceType: navigator.camera.PictureSourceType.CAMERA, 
    destinationType: navigator.camera.DestinationType.DATA_URL, 
    
   }); 
 
 }  
//base64 encoding the image
 onPhotoDataSuccess(imageData)
 { 
    var photo = document.getElementById('image').setAttribute('src',"data:image/jpeg;base64,"+imageData); 
   console.log("photo"+photo);
 } 
 onFail(message)
 { 
    alert('Failed because:' + message); 
 }   




  ngOnInit() {
   

	  this.activate.params.subscribe(params=>{
      this.project_id=params.id;
      //console.log(this.id);
    });



  this.chat.getChatDetails(this.project_id)
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
