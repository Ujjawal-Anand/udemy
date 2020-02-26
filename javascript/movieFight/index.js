const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '69d87029',
            s: searchTerm
        }
    });
    return response.data.Search;
}


const input = document.querySelector('#search_input_1');

const onInput = async (event) => {
    const movies = await(fetchData(event.target.value));

    for (let movie of movies) {
        const div = document.createElement('div');

        div.innerHTML = `
            <img src='${movie.Poster}' />
            <h2>${movie.Title}</h2>
        `;
        document.querySelector('#target').appendChild(div);
    }
}
input.addEventListener('input', debounce(onInput, 1000));
