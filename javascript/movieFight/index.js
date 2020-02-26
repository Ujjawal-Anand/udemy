const onMovieSelect = async (movie, summeryElement) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '69d87029',
            i: movie.imdbID
        }
    });

    summeryElement.innerHTML = movieTemplate(response.data);
    console.log(response.data);
}

const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Score</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">Rating</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">Votes</p>
        </article>

        
    `
}

const autocompleteConfig = {
    optionItem: (movie) => {
        const posterSrc = movie.Poster === "NA" ? '' : movie.Poster; 
        return `
            <img src='${posterSrc}' />
            ${movie.Title}
        `;
    },
    

    inputValue: (movie) => {
        return movie.Title
    },

    async fetchData(searchTerm)  {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '69d87029',
                s: searchTerm
            }
        });

        //handles the error
        if(response.data.Error) {
            return [];
        }
        return response.data.Search;    
    }
}

createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect: (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden');
        return onMovieSelect(movie, document.querySelector('#left-summery'));  
    }
});

createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect: (movie) => {
        return onMovieSelect(movie, document.querySelector('#right-summery'));  
    }
});
