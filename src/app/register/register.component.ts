import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  router: string;
  constructor(private _router: Router) {

    this.router = _router.url;
    console.log("this.router>>>>>>>>",this.router)
  }

  ngOnInit(): void {
  }

}
