import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) { //check to see if user exists
            // authorised so return true
            let flag = route.data.roles && !route.data.roles.includes(user.account_type); //value: true if user.account_type is anything other than admin 
            //console.log(flag);  testing the output of the following conditional 
            if (route.data.roles && !route.data.roles.includes(user.account_type)) {
                // role not authorized so redirect to home page
                //this.router.navigate(['/']);
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { AccountService } from '@app/_services';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private accountService: AccountService
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const account = this.accountService.accountValue;
//         if (account) {
//             // check if route is restricted by role
//             if (route.data.roles && !route.data.roles.includes(account.role)) {
//                 // role not authorized so redirect to home page
//                 this.router.navigate(['/']);
//                 return false;
//             }

//             // authorized so return true
//             return true;
//         }

//         // not logged in so redirect to login page with the return url 
//         this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
//         return false;
//     }
// }