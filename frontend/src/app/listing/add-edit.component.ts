import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ListingService } from '@app/_services/listing.service';
import { AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponentListings implements OnInit {
    formListing: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private listingService: ListingService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id']; //capturing the listings id from the url endpoint
        console.log(`value of id: ${this.id}`); 
        this.isAddMode = !this.id; //gets the userid and then negates the string id value to get a boolean value of false to indicate that the user already exists and only needs to be edited
        //this.isAddMode = true; changing this to true clears the name and other details for user
        console.log(`value of isAddMode: ${this.isAddMode}`); 
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.formListing = this.formBuilder.group({
            unit_no: ['', Validators.required],
            bedrooms: ['', Validators.required],
            bathrooms: ['', Validators.required],
            air_condition: ['', Validators.required],
            heating: ['', Validators.required],
            floor: ['', Validators.required],
            address: ['', Validators.required],
            monthly_rate: ['', Validators.required],
            sq_footage: ['', Validators.required],
            availability: ['', Validators.required],

        });

        if (!this.isAddMode) {
            this.listingService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.formListing.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.formListing.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.formListing.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUnit();
        } else {
            this.updateUnit();
        }
    }

    private createUnit() {
        this.listingService.register(this.formListing.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Unit added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUnit() {
        this.listingService.update(this.id, this.formListing.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}