import { Component } from '@angular/core';

import { user } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: user;
    accountType: string;
    adminAccess: boolean;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        this.accountType = this.user.account_type;
        if (this.accountType == 'admin') {
            this.adminAccess = true;
        }
        //console.log(`value of accountType: ${this.accountType}`);
    }
}