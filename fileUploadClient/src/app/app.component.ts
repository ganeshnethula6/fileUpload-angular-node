import { Component, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpService } from './http.service';
import * as _ from 'lodash';
export interface FileUpload{
  file:File,
  name:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addEventForm!: FormGroup;
  formData!: FormData;
  httpService: HttpService;
  profileImage!:FileUpload;
  resume!:FileUpload;
  imageError!: string;
  isImageSaved!: boolean;
  cardImageBase64!: string;
  imageValid: boolean=false;
  resumeValid: boolean=false;
  constructor(httpService:HttpService){
this.httpService=httpService;

  }
  changeProfileImage(event:any){
    if (event.target.files && event.target.files.length) {
      const file:File = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let kbSize=(file.size/1000);
        if(file.type=="image/png"&&kbSize<=1000 ){
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            console.log('Width and Height', width, height,file.size );
            
            if( width<=4000&&height<=3000){
              this.imageValid=true;
              this.profileImage={
                    file:event.target.files[0],
                    name:event.target.files[0].name
                  }
          } 
          };
        };
      }else{
        this.imageValid=false;
      }
    }
  }

  changResume(event:any){
    if(event.target.files && event.target.files.length){
      const resume:File=event.target.files[0];
    if(resume.type=="application/pdf"||resume.type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      this.resumeValid=true;
      this.resume={
        file:event.target.files[0],
        name:event.target.files[0].name
      }
      console.log(this.resume.file);
  }else{
    this.resumeValid=false;
  }
}
  }
  onSubmit(form:NgForm){
    this.formData=new FormData();
    this.formData.append("profileImage",this.profileImage.file,this.profileImage.name);
    this.formData.append("resume",this.resume.file,this.resume.name);
    this.formData.append('firstName',form.value.fname);
    this.formData.append('lastName',form.value.lname);
    this.formData.append('dob',form.value.dob);
    this.formData.append('gender',form.value.gender);
    this.formData.append('email',form.value.email);
    this.formData.append('phoneNumber',form.value.phoneNumber);
    this.formData.append('city',form.value.city);
    this.formData.append('address',form.value.address);
    this.formData.append('pincode',form.value.pincode);
    this.formData.append('passoutYear',form.value.passoutYear);
    this.formData.append('stream',form.value.stream);
    this.formData.append('primarySkill',form.value.primarySkill);
    this.formData.append('policyAgree',form.value.policyAgree);
 
    this.httpService.postData(this.formData).then((res)=>{
console.log(res);
    }).catch((error)=>{
console.log(error);
    });
   
  }
}
