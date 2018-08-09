import { Component, OnInit, Inject } from '@angular/core';
import { Input, Output, EventEmitter, HostListener } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_AUTOCOMPLETE_SCROLL_STRATEGY} from '@angular/material';
import {Router } from '@angular/router';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {ChatService} from '../services/chat.service';
import {ActivatedRoute } from '@angular/router';

declare let navigator:any;
declare let FileUploadOptions:any;
declare let FileTransfer:any;
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
  responsestatus:boolean;
   
  



formData =new FormData();
  constructor(private router:Router, private activate:ActivatedRoute,private http:Http,private chat:ChatService,public dialog: MatDialog) { }

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

  saveChat(e)
  {
    e.preventDefault();
    this.currentUser=JSON.parse(localStorage.getItem('Userinfo'));
    this.user_id=this.currentUser['uid'];
   
   
     

     // this.formData.append('file',this.uploadimg);
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
          this.responsestatus=data.response;
          if( this.responsestatus)
          {
            this.router.navigate(['chatdetails']);
          }
         
      }
    );
  }
  uploadimages():void
  {
    let dialogRef = this.dialog.open(DilogForuploadImages, {
      height: '150px',
      width:'auto',
     });
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
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
@Component({
  selector: 'app-profileDilog',
  template:` <mat-dialog-content style="font-size:30px; font-weight:bold;margin-bottom: 10px;">Select Image</mat-dialog-content>
             <mat-dialog-content style="font-size: 20px;margin-bottom: 5px" (click)="openGallary()">Open Gallary</mat-dialog-content>
            <mat-dialog-content style="font-size: 20px;" (click)="openCamera()">Take a Picture</mat-dialog-content>`
  
  
})
export class DilogForuploadImages
{
  constructor( 
    public dialogRef: MatDialogRef<DilogForuploadImages>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
    onNoClick(): void {
      this.dialogRef.close();
    }

     //function fir opening camera //
  
    openCamera()
    {
     
      console.log("take picture");
      navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { 
      quality: 50, 
      sourceType: navigator.camera.PictureSourceType.CAMERA, 
      destinationType: navigator.camera.DestinationType.DATA_URL, 
      
     }); 
     this.dialogRef.close();
   }  
  //base64 encoding the image
   onPhotoDataSuccess(imageData)
   { 
      var photo = document.getElementById('cameraimage').setAttribute('src',"data:image/jpeg;base64,"+imageData); 
     console.log("photo"+photo);
   } 
   onFail(message)
   { 
      alert('Failed because:' + message); 
   }   
  
  //function for opening gallery
  
    openGallary()
    {
      
      navigator.camera.getPicture(this.onGetPictureSuccess, this.onGetPictureFail, { 
        quality: 50, 
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, 
        destinationType: navigator.camera.DestinationType.DATA_URL, 
    });
    this.dialogRef.close();
   }
  //base64 encoding the image
     onGetPictureSuccess(imageData)
     { 
       var photo = document.getElementById('cameraimage').setAttribute('src',"data:image/jpeg;base64,"+imageData); 

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(imageData, "http://adkambs.com/ConstructionApp/ConstructionApp/Welcome/getimage", function(result){
    console.log(JSON.stringify(result));
     }, function(error){
     console.log(JSON.stringify(error));
      }, options);
       
      } 
    onGetPictureFail(message)
    { 
      alert('Failed because:' + message); 
    }  
  }