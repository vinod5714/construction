import { Component, OnInit,Inject } from '@angular/core';
import { Http,Response } from '@angular/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_AUTOCOMPLETE_SCROLL_STRATEGY} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router } from '@angular/router';
 declare let navigator:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  options: FormGroup;
  constructor(private http:Http,public dialog: MatDialog,private router:Router,private fb:FormBuilder) {
    this.options = fb.group({
      floatLabel: 'never',
   });
   }
  public currentUser:string;
  flag:boolean=false;
  flag1:boolean=false;
  name:string;
  userid:number;
  worked_At:string;
  worked_As:string;
  qualification:string;
  isResponse:boolean=false;
  status:string;

  
  workedAt:string;
  workedAs:string;
  qualifiCation:string;

  enableWorkat:boolean;
  disableWorkat:boolean=true;

  enableWorkas:boolean;
  disableWorkas:boolean=true;

  enableQualification:boolean;
  disableQualification:boolean=true;

  imagePath:string;

  viewpersonalDetails()
  {
    this.flag=!this.flag;
   /* this.http.post("http://localhost/ipskc/file/view_profile_data",JSON.stringify({id:this.userid}))
    .map((response:Response)=>response.json())
    .subscribe(
      data => {
            
             this.worked_At=data.worked_At;
             this.worked_As=data.worked_As;
             this.qualification=data.qualification;
            // this.isResponse=data.status;
        }

    );*/
    return Observable.of(JSON.stringify({"worked_At":"CITY hospital","worked_As":"physiothraphyst","qualification":"MBBS","status":true}))
    .map((data) => data)
    .subscribe(
      data => {
             console.log(data);
             this.worked_At=JSON.parse(data).worked_At;
             this.worked_As=JSON.parse(data).worked_As;
             this.qualification=JSON.parse(data).qualification;

        }

    );       
    
   
  }
  changeWorkAt()
  {
    this.enableWorkat =  !this.enableWorkat;
    this.disableWorkat =  !this.disableWorkat;
  }
  changeWorkAs()
  {
    this.enableWorkas = true;
    this.disableWorkas = false;
  }
  changeQualification()
  {
    this.enableQualification = true;
    this.disableQualification = false;
  }
 
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '200px',
      width: '200px',
   
     
    });
   dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(`Dialog result: ${result}`);
      if(result)
      {
        localStorage.removeItem('logindata');
        //this.openDialog();
        this.router.navigate(['/']);
      }
      else
      {
        console.log("no logout");
      }
     
    });
  }
  openDilogSaveChanges():void
  {
    let dialogRef = this.dialog.open(DilogForSaveChanges, {
      height: '200px',
      width:'auto',
     });
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(`Dialog result: ${result}`);
      if(result)
      {
        return Observable.of(JSON.stringify({"status":"Your Profile Details Updated Successfully"}))
        .map((data) => data)
        .subscribe(
          data => {
                   this.status=JSON.parse(data).status;
                   this.isResponse=true;
                 
          });       
        
      }
      else
      {
         this.isResponse=false;
      }
     });

  }
  changeProfilePicture():void
  {
    let dialogRef = this.dialog.open(DilogForChangeProfilePicture, {
      height: '150px',
      width:'auto',
     });
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(`Dialog result: ${result}`);
     
        })
}
  selectedOption:string;
  workedas:string;
  workedat:string;

  saveChanges(e)
  {
    
    e.preventDefault();
    if(e.target.workedAt.value){
    this.workedAt=e.target.workedAt.value;
    }
    if(e.target.workedAs.value){
    this.workedAs=e.target.workedAs.value;
    }
    if(e.target.qualifiCation){
    this.qualifiCation=e.target.qualifiCation.value;
    }
    else
    {
      this.qualifiCation=this.selectedOption;
    }
    
  
    console.log(this.workedAt);
    console.log(this.workedAs);
    console.log(this.qualifiCation);
   
    

   /* this.http.post("http://localhost/ipskc/file/edit_details",JSON.stringify({id:this.userid,workedAt:this.workedAt,workedAs:this.workedAs,qualification:this.qualifiCation}))
    .map((response:Response)=>response.json())
    .subscribe(
      data => {
             console.log(data);
             

             });
     return Observable.of(JSON.stringify({"status":"Your Profile Details Updated Successfully"}))
      .map((data) => data)
      .subscribe(
        data => {
                 this.status=JSON.parse(data).status;
               
        }); */        

  }
  logout(e)
  {
    localStorage.removeItem('logindata');
    //this.openDialog();
    this.router.navigate(['/']);
  }
 
  public workAsList=['docter','physiothreapist', 'heartspecialist'];
  public workAtList=['jss hospital','rv dental', 'bgs hospital', 'ABHAYA HOSPITAL'];
  
  toppingList = ['MBBS', 'PHD', 'DNB', 'BSc(speech and hearing)'];
  
  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem('logindata'));
  //  console.log(this.currentUser['name']);
    this.name=this.currentUser['name'];
    this.userid=this.currentUser['userid'];
   /* this.http.post("http://localhost/ipskc/file/view_profile_picture",JSON.stringify({id:this.userid}))
    .map((response:Response)=>response.json())
    .subscribe(
      data => {
            // console.log(data);
             //this.imagePath=data.imagePath;
           //  this.isResponse=data.status;
            

             });*/
             return Observable.of(JSON.stringify({"imageName":"mr tags.jpg","imagePath":"./assets/icons/logo.png","status":true,"worked_At":"CITY hospital","worked_As":"physiothraphyst","qualification":"MBBS"}))
             .map((data) => data)
             .subscribe(
               data => {
                      
                this.imagePath=JSON.parse(data).imagePath;
                this.worked_At=JSON.parse(data).worked_At;
                this.worked_As=JSON.parse(data).worked_As;
                this.qualification=JSON.parse(data).qualification;
                console.log(this.imagePath);
                 }
         
             );         

   
            
   
  }

}
@Component({
  selector: 'app-profileDilog',
  templateUrl:'./profileDilogue.component.html',
  styleUrls: ['./profile.component.css']
  
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

   onNoClick(): void {
   this.dialogRef.close();
  }

}
@Component({
  selector: 'app-profileDilog',
  template:`<mat-dialog-content style="margin: 20px -24px;">Do You Want to the following changes?</mat-dialog-content>
            <mat-dialog-actions>
      <div class="dilog-container">
    <button mat-button (click)="dialogRef.close(false)">No</button>
    <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
    <button mat-button (click)="dialogRef.close(true)">Yes</button>
  </div>
  </mat-dialog-actions>`
  
  
})
export class DilogForSaveChanges
{
  constructor( 
    public dialogRef: MatDialogRef<DilogForSaveChanges>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
    onNoClick(): void {
      this.dialogRef.close();
    }
}
@Component({
  selector: 'app-profileDilog',
  template:` <mat-dialog-content style="font-size:30px; font-weight:bold;margin-bottom: 10px;">Select Image</mat-dialog-content>
             <mat-dialog-content style="font-size: 20px;margin-bottom: 5px" (click)="openGallary()">Open Gallary</mat-dialog-content>
            <mat-dialog-content style="font-size: 20px;" (click)="openCamera()">Take a Picture</mat-dialog-content>`
  
  
})
export class DilogForChangeProfilePicture
{
  constructor( 
    public dialogRef: MatDialogRef<DilogForChangeProfilePicture>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
    onNoClick(): void {
      this.dialogRef.close();
    }
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
      var photo = document.getElementById('image').setAttribute('src',"data:image/jpeg;base64,"+imageData); 
     console.log("photo"+photo);
   } 
   onFail(message)
   { 
      alert('Failed because:' + message); 
   }   
    
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
       var photo = document.getElementById('image').setAttribute('src',"data:image/jpeg;base64,"+imageData); 
      } 
    onGetPictureFail(message){ 
          alert('Failed because:' + message); 
       } 

}