import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService} from '@app/_services';
import {ApplicationService} from '../_services/application.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  form: FormGroup;
  formApplication: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private applicationService: ApplicationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      title: [''],
      dob: ['', Validators.required],
      ssn: ['', Validators.required],
      drivers_license: ['', Validators.required],
      account_type: ['applicant'],
      password: ['', [Validators.required, Validators.minLength(6)]],
      //phone: ['', [Validators.required, Validators.minLength(10)]],
      //email: ['', Validators.required],
    });

    this.formApplication = this.formBuilder.group({
      credit_score: ['', Validators.required],
      income: ['', Validators.required],
      unit_id: ['', Validators.required],
      employer: ['', Validators.required],
      house_mate_count: ['', Validators.required],
      vehicle: ['', Validators.required],
      applicant_id: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  get fA() {
    return this.formApplication.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.applicationService
    .register(this.formApplication.value);

    this.accountService
      .register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
