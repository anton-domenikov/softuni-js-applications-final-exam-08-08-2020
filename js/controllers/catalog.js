import {getAll, createMovie, checkResult, getMovieById, editMovie, likeMovie, deleteMovie as apiDelete} from '../data.js';
import {showError, showSuccess} from '../notifications.js';


export async function pageNotFound() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs')
    };
    this.partial('./templates/common/pnf.hbs');
}

export async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        // catalog: await this.load('./templates/catalog/catalog.hbs'),
        movie: await this.load('./templates/catalog/movie.hbs')
    };
    
    const context = Object.assign({}, this.app.userData);

    if (this.app.userData.email) {
        const movies = await getAll();
        context.movies = movies;
        
    }   

    this.partial('./templates/home.hbs', context);
}

export async function createPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/catalog/create.hbs', this.app.userData);
}

export async function editPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const movie = await getMovieById(this.params.id);
    const context = Object.assign({movie}, this.app.userData);


    this.partial('./templates/catalog/edit.hbs', context);

}

export async function detailsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const id = this.params.id;
    const movie = await getMovieById(id);
    const context = Object.assign({movie}, this.app.userData);
    if (movie.ownerId === this.app.userData.userId) {
        movie.canEdit = true;
    }

    this.partial('./templates/catalog/details.hbs', context);

    // not to redirect when LIKING the movie
    // await this.partial('./templates/catalog/details.hbs', context);

    // const likeBtn = document.querySelector('#likeBtn');
    // likeBtn.addEventListener('click', async (e) => {
    //     e.preventDefault();
    //     try {
    //         const result = await likeMovie(id);
    //         checkResult(result);
    //         movie.liked = true;
    //         showSuccess('You liked that Movie');
    //     } catch(err) {
    //         alert(err.message);
    //     } 
    // });

}

export async function like() {
    const id = this.params.id;
    
    try {
        const result = await likeMovie(id);
        checkResult(result);
        showSuccess('You liked that movie');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function deleteMovie() {
    const id = this.params.id;
    
    try {
        const result = await apiDelete(id);
        checkResult(result);
        showSuccess('Your movie was archived');
        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}

export async function createPost() {
    console.log(this);
    const movie = {
        creator: this.app.userData.userId,
        description: this.params.description,
        title: this.params.title,
        imageUrl: this.params.imageUrl,
        likes: 0
    };

    try {
        if (movie.title.length < 1) {
            throw new Error('Title can\'t be empty!');
        }
        if (movie.description.length < 1) {
            throw new Error('Description can\'t be empty!');
        }
        if (movie.imageUrl.length < 1 ) {
            throw new Error('Image URL can\'t be empty!');
        }

        const result = await createMovie(movie);
        checkResult(result);

        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}

export async function editPost(){
    const id = this.params.id;
    const movie = await getMovieById(id);

    
    movie.title = this.params.title;
    movie.description = this.params.description;
    movie.imageUrl = this.params.imageUrl;


    try {
        if (movie.title.length < 1) {
            throw new Error('Title can\'t be empty!');
        }
        if (movie.description.length < 1) {
            throw new Error('Description can\'t be empty!');
        }
        if (movie.imageUrl.length < 1 ) {
            throw new Error('Image URL can\'t be empty!');
        }

        const result = await editMovie(id, movie);
        checkResult(result);

        this.redirect(`#/details/${id}`);
    } catch (err) {
        alert(err.message);
    }
}