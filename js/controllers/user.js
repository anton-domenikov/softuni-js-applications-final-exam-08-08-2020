import { showError, showSuccess } from '../notifications.js';
import { register, checkResult, login, logout as apiLogout } from '../data.js';

export async function registerPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/register.hbs');
}

export async function loginPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/login.hbs');
}

export async function logout() {
    try {
        await apiLogout();

        this.app.userData.email = '';
        this.app.userData.userId = '';

        showSuccess('Successful logout');
        this.redirect('#/login');
    } catch (err) {
        showError(err.message);
    }
}

export async function registerPost() {
    try {
        if (this.params.email.length < 3) {
            throw new Error('Email must be at least 3 characters long!');
        }
        if (this.params.password.length < 6) {
            throw new Error('Password must be at least 6 characters long!');
        }
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Passwords must match!');
        }
        const result = await register(
            this.params.email, 
            this.params.password
        );
        // console.log(this.params);

        checkResult(result);

        const loginResult = await login(
            this.params.email, 
            this.params.password
        );

        checkResult(loginResult);

        this.app.userData.email = loginResult.email;
        this.app.userData.userId = loginResult.objectId;

        showSuccess('Successful registration');
        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}


export async function loginPost() {
    try {
        const result = await login(
            this.params.email, 
            this.params.password
        );

        checkResult(result);

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;

        showSuccess('Login successful');
        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}


