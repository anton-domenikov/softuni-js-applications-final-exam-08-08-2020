import { home, createPage, createPost, editPage, editPost, detailsPage, deleteMovie, pageNotFound, like } from './controllers/catalog.js';
import { registerPage, registerPost, loginPage, loginPost, logout } from './controllers/user.js';


window.addEventListener('load', () => {
    const app = Sammy('#container', function() {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: sessionStorage.getItem('email') || '',
            userId: sessionStorage.getItem('userId') || '',
        };

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', registerPage);
        this.get('#/login', loginPage);
        this.get('#/logout', logout);

        this.get('#/create', createPage);
        this.get('#/edit/:id', editPage);
        this.get('#/details/:id', detailsPage);
        this.get('#/like/:id', like);
        this.get('#/delete/:id', deleteMovie);


        this.post('#/register', (ctx) => { registerPost.call(ctx); });
        this.post('#/login', (ctx) => { loginPost.call(ctx); });
        this.post('#/create', (ctx) => { createPost.call(ctx); });
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx); });

       this.get('', pageNotFound);
    });

    app.run();
});