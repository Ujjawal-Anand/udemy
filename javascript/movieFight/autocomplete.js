const createAutoComplete = ({ root, optionItem, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
        <label for="search_item">Search</label>
        <input class="input" type="text" name="search_item" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `

    const input = root.querySelector('.input');
    const dropdown = root.querySelector('.dropdown');
    const resultWrapper = root.querySelector('.results');

    

    const onInput = async (event) => {
    const items = await(fetchData(event.target.value));
    
    // don't show dropdown when item-list is empty
    if(!items.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    // reset the list to remove previously fetched results
    resultWrapper.innerHTML = '';
    // make the dropdown active
    dropdown.classList.add('is-active');

    for (let item of items) {
        const option = document.createElement('a');
        
        // handles the case of broken image urls

        option.classList.add('dropdown-item');
        option.innerHTML = optionItem(item);

        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = inputValue(item);
            onOptionSelect(item);
        })

        resultWrapper.appendChild(option);
    }
}

// add event listner to input
input.addEventListener('input', debounce(onInput, 1000));

// close dropdown when clicking elsewhere
document.addEventListener('click', (event) => {  
    if(!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
})
}