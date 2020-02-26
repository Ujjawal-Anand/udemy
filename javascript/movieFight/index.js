const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label for="search_movie">Search Movie You Are Looking For</label>
<input class="input" type="text" name="search_movie" />
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`

const input = document.querySelector('.input');
const dropdown = document.querySelector('.dropdown');
const resultWrapper = document.querySelector('.results');

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '69d87029',
            s: searchTerm
        }
    });
    if(response.data.Error) {
        return [];
    }
    return response.data.Search;
}

const onInput = async (event) => {
    const movies = await(fetchData(event.target.value));
    resultWrapper.innerHTML = '';
    dropdown.classList.add('is-active');

    for (let movie of movies) {
        const option = document.createElement('a');
        const posterSrc = movie.Poster === "NA" ? '' : movie.Poster; 

        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src='${posterSrc}' />
            ${movie.Title}
        `;
        resultWrapper.appendChild(option);
    }
}

input.addEventListener('input', debounce(onInput, 1000));
