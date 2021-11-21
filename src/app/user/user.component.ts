import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { BackEndService, AlertService } from '../services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private BackEndService: BackEndService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          mobile: ['', Validators.required],
          amount: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.BackEndService.transfer(this.f['mobile'].value, this.f['amount'].value)
          .pipe(first())
          .subscribe({
              next: (data) => {
                  console.log("inside next", data , Object.keys(data))
                  // get return url from query parameters or default to home page
                  this.alertService.success(data.msessage);
                  //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
                  //this.router.navigateByUrl(returnUrl);
                  this.loading = false;


              },
              error: error => {
                  console.log("$$$$$$", error.error)
                  this.alertService.error(error.error.message);
                  this.loading = false;
              }
          });
  }
}
