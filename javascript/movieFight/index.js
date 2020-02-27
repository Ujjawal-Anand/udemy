let leftMovie, rightMovie;
const onMovieSelect = async (movie, summeryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '69d87029',
            i: movie.imdbID
        }
    });
    summeryElement.innerHTML = movieTemplate(response.data);

    if(side==='left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie) {
        runComparision();
    }
}

const runComparision = () => {
    const leftSideStats = document.querySelectorAll('#left-summery .notification');
    const rightSideStats = document.querySelectorAll('#right-summery .notification');

    leftSideStats.forEach((leftSideStat, index) => {
        const leftStatValue = leftSideStat.dataset.value;
        const rightStatValue = rightSideStats[index].dataset.value;

        if(!isNaN(parseFloat(leftStatValue) && !isNaN(parseFloat(rightStatValue)))) {
            if(parseFloat(leftStatValue) > parseFloat(rightStatValue)) {
                rightSideStat.classList.remove('is-primary');
                rightSideStat.classList.add('is-warning');
            } else {
                leftSideStat.classList.remove('is-primary');
                leftSideStat.classList.add('is-warning');
            }
        }
    });
}

const movieTemplate = movieDetail => {
    const boxOffice = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g,''));
    const metaScore = parseInt(movieDetail.Metascore);
    const rating = parseFloat(movieDetail.imdbRating);
    const votes = parseInt(movieDetail.imdbVotes.replace(/,/g,''));

    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if(isNaN(value)) {
            return prev;
        } else {
            return prev+value;
        }
    }, 0)
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

        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>

        <article data-value=${boxOffice} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>

        <article data-value=${metaScore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Score</p>
        </article>

        <article data-value=${rating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">Rating</p>
        </article>

        <article data-value=${votes} class="notification is-primary">
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
        return onMovieSelect(movie, document.querySelector('#left-summery'), 'left');  
    }
});

createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect: (movie) => {
        return onMovieSelect(movie, document.querySelector('#right-summery'), 'right');  
    }
});
