let leftMovie, rightMovie;

// function to be called when user selects particular movie from
// autocomplete dropdown list 
const onMovieSelect = async (movie, summeryElement, side) => {
    // fetch the movie with given id
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '69d87029',
            i: movie.imdbID
        }
    });
    // add the movie template filled with movie data to summery element
    summeryElement.innerHTML = movieTemplate(response.data);

    // finds whether data belongs to movie searched in left or right
    if(side==='left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    // when search in both side completes, run the comarision
    if(leftMovie && rightMovie) {
        runComparision();
    }
}

// function to compare the stats of movies in both sides
const runComparision = () => {
    // get list of all child elements with class notification in left summery 
    const leftSideStats = document.querySelectorAll('#left-summery .notification');
    
    // get list of all child elements with class notification in right summery 
    const rightSideStats = document.querySelectorAll('#right-summery .notification');

    // iterate over each element in left => find the dataset value => 
    // look for corresponding value in right side using index => compare them
    leftSideStats.forEach((leftSideStat, index) => {
        const leftStatValue = leftSideStat.dataset.value;
        const rightStatValue = rightSideStats[index].dataset.value;

        // first check persence of NaN value in either side
        // if there is NaN value => skip comaprison
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

// movie-template => used to create summery of movie with data
const movieTemplate = movieDetail => {
    // boxOffice data is in form of $12,345,567 remove $ and , to convert to int
    const boxOffice = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g,''));
    const metaScore = parseInt(movieDetail.Metascore);
    const rating = parseFloat(movieDetail.imdbRating);
    // remove , from votes first
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

// autocomplete config parameters
const autocompleteConfig = {
    // this will be shown inside dropdown as dropdown item
    optionItem: (movie) => {
        const posterSrc = movie.Poster === "NA" ? '' : movie.Poster; 
        return `
            <img src='${posterSrc}' />
            ${movie.Title}
        `;
    },
    
    // this will be shown in input-box when user clicks on dropdown-item
    inputValue: (movie) => {
        return movie.Title
    },

    // function to be called to fetch data that belongs to given search term
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

// create auto complete for left side
createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect: (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden');
        return onMovieSelect(movie, document.querySelector('#left-summery'), 'left');  
    }
});

// create auto complete for right side
createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect: (movie) => {
        return onMovieSelect(movie, document.querySelector('#right-summery'), 'right');  
    }
});
