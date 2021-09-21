import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';

 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  custodian:any;
  flag:any
  loginForm:FormGroup; 
  constructor(private http:HttpClient,private router:Router,
    private service:DataService,private toastr:ToastrService) {
    this.flag=0;
    this.loginForm =new FormGroup({
      custodianid: new FormControl('', [
  
        Validators.required,
        
        // Validators.pattern(/^[a-z0-9]+$/i)
      ]),
      password: new FormControl('', [
  
        Validators.required,
        
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)
      ]),
      
    });
  
  }


  ngOnInit(): void {

  }
  handleLogin() {
    this.custodian={
      "username":this.custodianid,
      "password":this.password,
      
    }
 
    this.http.post("http://localhost:8080/authenticate",this.custodian)
.subscribe((result:any)=>{
  // console.log(result);
if(result==null){
this.flag=1;

}
else{
this.flag=0;
console.log(this.custodian);
this.toastr.success('successfull login','SUCCESS')
localStorage.setItem('custId',this.custodianid)
localStorage.setItem('jwt',result.jwt);
this.service.custodianid=this.custodianid;
this.router.navigate(["/dashboard"]);
// console.log(this.service.custodianid);
console.log(this.flag);

  }
},

err=>{
  this.flag=1;
  this.toastr.error('invalid credentials','error')


// this.router.navigate(["/login"]);
  }
  )


 

}


  get custodianid() {
    return this.loginForm.controls['custodianid'].value;
  }
  get password() {
    return this.loginForm.controls['password'].value;
  }
  
}
 