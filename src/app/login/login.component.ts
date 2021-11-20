import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mobile: string = "tektutorialshub"
  password: string = "tektutorialshub"
  userName: any;
  errorMessage: any;
  contactForm: any;

  constructor(private serverRemote: HttpService) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log('Your form data : ');
}

  public login() {
    console.log("loginnnnn")
    this.serverRemote.login(this.mobile, this.password)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })
  }
}
