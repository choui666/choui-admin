import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    isLogin = false;

    login(usereName: string, password: string) {
        if (usereName && usereName === 'choui' && password && password === '666666') {
            this.isLogin = true;
            return true;
        } else {
            return false;
        }
    }

}
