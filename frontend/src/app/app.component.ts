import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Role } from './_models/role';
import { transition } from '@angular/animations';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    Role = Role;
    accountType: string;
    adminAccess: boolean;


    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
        // this.user = this.accountService.userValue;
        // this.accountType = this.user.account_type;
        // if (this.accountType == 'admin') {
        //     this.adminAccess = true;
        // }
        //console.log(`value of accountType: ${this.accountType}`);
    }

    logout() {
        this.accountService.logout();
    }
}