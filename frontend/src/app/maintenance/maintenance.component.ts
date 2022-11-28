import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MaintenanceService } from '@app/_services/maintenance.service';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.less']
})
export class MaintenanceComponent implements OnInit {


    formMaintenance: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private maintenanceService: MaintenanceService, //call maintenance service to access API endpoints
        private alertService: AlertService
    ) { }

    ngOnInit() { //initialization of the required variables/fields
        this.formMaintenance = this.formBuilder.group({
            unit_no: ['', Validators.required], //associated tenant username
            user_id: ['1', Validators.required], //associated tenant username
            project_id: ['1', Validators.required], //associated tenant username
            description: ['', Validators.required], 
            primary_phone: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.formMaintenance.controls; }


    getRandomInt(min, max) : number{ 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

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