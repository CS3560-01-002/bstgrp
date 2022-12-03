import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MaintenanceService } from '@app/_services/maintenance.service';
import { AlertService } from '@app/_services';
import { User } from '@app/_models';
import { AccountService } from '@app/_services'; //used to get the current user's account details

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.less']
})
export class MaintenanceComponent implements OnInit {


    formMaintenance: FormGroup;
    loading = false;
    submitted = false;
    proj_id: string;
    user: User;
    userId: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private maintenanceService: MaintenanceService, //call maintenance service to access API endpoints
        private accountService: AccountService, //call account service to access API endpoints
        private alertService: AlertService
    ) { 

        this.user = this.accountService.userValue;
        this.userId = this.user.username;
    }

    ngOnInit() { //initialization of the required variables/fields
        this.proj_id =  (Math.floor(Math.random() * (100 - 1 + 1)) + 1).toString(); 
        //this.proj_id = this.proj_id
        this.formMaintenance = this.formBuilder.group({
            unit_no: ['', Validators.required], 
            //user_id: ['1', Validators.required], 
            user_id: this.userId,
            project_id: [this.proj_id, Validators.required], 
            description: ['', Validators.required], 
            primary_phone: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.formMaintenance.controls; }


    // getRandomInt(min, max) : number{ 
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min; 
    // }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.formMaintenance.invalid) {
            return;
        }

        this.loading = true;
        this.maintenanceService.register(this.formMaintenance.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Ticket Submission successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../listing'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}