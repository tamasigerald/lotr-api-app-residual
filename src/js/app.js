const urlsToFetch = [{
        title: 'Books',
        class: 'nav__books',
        storageKey: 'booksStorage',
        dateKey: 'booksDate',
        url: 'https://the-one-api.dev/v2/book'
    },
    {
        title: 'Characters',
        class: 'nav__characters',
        storageKey: 'charactersStorage',
        dateKey: 'charactersDate',
        url: 'https://the-one-api.dev/v2/character'
    },
    {
        title: 'Movies',
        class: 'nav__movies',
        storageKey: 'moviesStorage',
        dateKey: 'moviesDate',
        url: 'https://the-one-api.dev/v2/movie'
    },
    {
        title: 'Quotes',
        class: 'nav__quotes',
        storageKey: 'quotesStorage',
        dateKey: 'quotesDate',
        url: 'https://the-one-api.dev/v2/quote'
    }
]

// localStorage.clear();

// FETCH URL - STORES DATA & DATE TO LOCALSTORAGE
const fetchUrl = (url, storageKey, dateKey) => {
    fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + ' ' + 'J70kXOiPN_b7z89B15k-'
            },
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem(`${storageKey}`, JSON.stringify(res.docs));
            localStorage.setItem(`${dateKey}`, getDateOfStorage());
            // let dateOfStorage = ;
        })
}

// GETS ACTUAL DATA (DEV PURPOSE)
const getDateOfStorage = () => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
};

// ASSIGN VARIABLES FOR EASIER ACCESS
let localBooks = JSON.parse(localStorage.getItem('booksStorage'));
let localCharacters = JSON.parse(localStorage.getItem('charactersStorage'));
let localMovies = JSON.parse(localStorage.getItem('moviesStorage'));
let localQuotes = JSON.parse(localStorage.getItem('quotesStorage'));

let booksDate = localStorage.getItem('booksDate');
let charactersDate = localStorage.getItem('charactersDate');
let moviesDate = localStorage.getItem('moviesDate');
let quotesDate = localStorage.getItem('quotesDate');

// console.log(localBooks); // Debug purpose only
// console.log(localCharacters); // Debug purpose only
// console.log(localMovies); // Debug purpose only
// console.log(localQuotes); // Debug purpose only

// console.log(localStorage); // Debug purpose only


// MAIN COMPONENTS CALLER
const app = () => {
    const body$$ = document.querySelector('body');
    getHeader(body$$);
    getMain(body$$);
    getFooter(body$$);
}

// HANDLES FETCH ON FIRST APP VISIT || NO LOCALSTORAGE YET
const handleNavBtnClick = (urlIndex) => {
    let element = urlsToFetch[urlIndex];
    fetchUrl(element.url, element.storageKey, element.dateKey);
};

// REMOVE ELEMENT UTILITY
const removeElement = (element) => {
    element.remove();
}

// DEV TESTING 
const getValueByID = (idToFind, storage) => {
    for (const id in storage) {
        if (storage[id]._id == idToFind) {
            console.log(storage[id].name);
            return storage[id].name;
        }
    }
}

//CREATES EVERY ELEMENTS LIST
const createCard = (el, arr, main$$, searchArr) => {
    const createCont$$ = document.createElement('section');
    createCont$$.classList.add('container');
    createCont$$.classList.add('animate__animated');
    createCont$$.classList.add('animate__fadeIn');
    const contentCard$$ = document.createElement('ul');
    contentCard$$.classList.add('card')
    iterateCardEl(createCont$$, contentCard$$, el, arr, searchArr);
    iterateCardEl(createCont$$, contentCard$$, el, arr, localBooks);
    iterateCardEl(createCont$$, contentCard$$, el, arr, localCharacters);
    iterateCardEl(createCont$$, contentCard$$, el, arr, localMovies);
    iterateCardEl(createCont$$, contentCard$$, el, arr, localQuotes);
    createCont$$.appendChild(contentCard$$);
    main$$.appendChild(createCont$$);
}

// CHECK ELEMENTS DATA SOURCE & PRINTS
const iterateCardEl = (createCont$$, contentCard$$, el, arr,  arrCheck) => {
    if (arr == arrCheck) {
        const nameTitle$$ = document.createElement('h3');
        createCont$$.appendChild(nameTitle$$);
        for (const key in el) {
            nameTitle$$.classList.add('card__title');
            nameTitle$$.innerHTML = el.name || el.dialog;
            
            if (key !== '_id' && key !== 'name' && el[key] != '' && key !== 'dialog' && el[key] != 'NaN') {
                const elCont$$ = document.createElement('li');
                elCont$$.classList.add('card__content');
                const elTitle$$ = document.createElement('p');
                elTitle$$.classList.add('card__id');
                let elInfo$$ = document.createElement('p')
                elInfo$$.classList.add('card__info');
                
                // Reformat Key fo UX
                let titleRegex = key.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, "$1 $2");
                titleRegex = titleRegex.toLowerCase();
                titleRegex = titleRegex.charAt(0).toUpperCase() + titleRegex.slice(1);
                
                elTitle$$.innerHTML = `${titleRegex}`;
                elInfo$$.innerHTML = `${el[key]}`;
                
                if (key == 'movie') {
                    elInfo$$.innerHTML = `${getValueByID(el[key], localMovies)}`;
                }
                if (key == 'character') {
                    elInfo$$.innerHTML = `${getValueByID(el[key], localCharacters)}`;
                }
                if (key == 'wikiUrl') {
                    elInfo$$ = document.createElement('a');
                    elInfo$$.setAttribute('href', `${el[key]}`);
                    elInfo$$.setAttribute('target', '_blank');
                    elInfo$$.classList.add('wiki-link');
                    elInfo$$.innerHTML = 'LOTR Wiki';
                    
                }
                // Append elements
                elCont$$.appendChild(elTitle$$);
                elCont$$.appendChild(elInfo$$);
                contentCard$$.appendChild(elCont$$);
            }

        }
    }
    
}

// CREATES LIST OF MAX 5 ELEMENTS ON NAV CLICK
const createContent = (main$$, arr, searchArr) => {
    const containerRemove$$ = document.querySelector('.container');
    if (containerRemove$$) {
        removeElement(containerRemove$$);
    }
    const contentCont$$ = document.createElement('section');
    contentCont$$.classList.add('animate__animated');
    contentCont$$.classList.add('animate__fadeIn');
    contentCont$$.classList.add('container')
    const content$$ = document.createElement('ul');
    content$$.classList.add('content')
    let arrSize = 10;
    let randomArr = arr.sort(() => Math.random() - 0.5);
    let shownResults = randomArr.slice(0, arrSize).map(
        el => {
            const liContent$$ = document.createElement('a');
            liContent$$.classList.add('content__li');
            liContent$$.innerHTML = el.name || el.dialog;
            liContent$$.setAttribute('href', '#');
            content$$.appendChild(liContent$$);
            liContent$$.addEventListener('click', createCard);
            liContent$$.addEventListener('click', () => {
                const containerRemove$$ = document.querySelector('.container');
                removeElement(containerRemove$$);
                createCard(el, randomArr, main$$, searchArr);
            })
        }
        )
        contentCont$$.appendChild(content$$)
        main$$.appendChild(contentCont$$);
}


// CREATE HEADER
const getHeader = (body) => {
    const header$$ = document.createElement('header');

    // BLOCKS
    const navBar$$ = document.createElement('div');
    navBar$$.classList.add('nav')
    
    // ELEMENTS
    const logoCont$$ = document.createElement('a');
    const logo$$ = document.createElement('img');
    logo$$.addEventListener('mouseover', () => {
        logo$$.classList.add('animate__animated');
        logo$$.classList.add('animate__fadeIn');
        logo$$.style.setProperty('--animate-duration', '0.5s');
        logo$$.style.setProperty('background-color', 'var(--gold)');
        logo$$.style.setProperty('border-radius', '50%');
    })
    logo$$.addEventListener('mouseout', () => {
        logo$$.style.setProperty('background-color', '');
        
        logo$$.classList.remove('animate__fadeIn');
        
    })
    logoCont$$.classList.add('nav__logo');
    logoCont$$.setAttribute('href', '#');
    logo$$.setAttribute('src', './assets/img/logo.svg');
    const nav$$ = document.createElement('nav');
    nav$$.classList.add('nav__menu');
    header$$.classList.add('animate__animated');
    header$$.classList.add('animate__fadeIn');
    header$$.style.setProperty('--animate-duration', '5s');
    const ulLinks$$ = document.createElement('ul');
    for (const link in urlsToFetch) {
        const liLink$$ = document.createElement('a');
        liLink$$.setAttribute('href', '#')
        liLink$$.classList.add('nav__link');
        liLink$$.innerHTML = urlsToFetch[link].title;
        ulLinks$$.appendChild(liLink$$);
        liLink$$.addEventListener('mouseover', () => {
            liLink$$.classList.add('animate__animated');
            liLink$$.classList.add('animate__fadeIn');
            liLink$$.style.setProperty('--animate-duration', '1s');
        })
        liLink$$.addEventListener('mouseout', () => {
            liLink$$.classList.remove('animate__fadeIn');
        })
        liLink$$.addEventListener('click', () => {
            toggleClass(liLink$$, 'active');
        })
    }
    
    logoCont$$.addEventListener('click', () =>{
        const content$$ = document.querySelector('.container');
        const liLink$$ = document.querySelector('.active');
        toggleClass(liLink$$, 'active');
        removeElement(content$$);
        getMain(body);
    });
    
    
    
    
    
    // APPENDS
    logoCont$$.appendChild(logo$$);
    nav$$.appendChild(ulLinks$$);
    navBar$$.appendChild(logoCont$$);
    search(nav$$);
    navBar$$.appendChild(nav$$);
    
    header$$.appendChild(navBar$$);
    body.appendChild(header$$);
}
   

// CREATE MAIN
const getMain = (body) => {
        let main$$ = document.querySelector('main');
        if (!main$$) {
            main$$ = document.createElement('main');
        }
        const hero$$ = document.createElement('section');
        hero$$.classList.add('hero')
        hero$$.classList.add('animate__animated');
        hero$$.classList.add('animate__fadeIn');
        hero$$.style.setProperty('--animate-duration', '8s');
        const mainTitle$$ = document.createElement('h1');
        mainTitle$$.innerHTML = 'Lord of the Rings';
        const subTitle$$ = document.createElement('h2');
        subTitle$$.innerHTML= 'An api Wikia';
        subTitle$$.classList.add('animate__animated');
        subTitle$$.classList.add('animate__fadeIn');
        subTitle$$.style.setProperty('--animate-duration', '12s');
        body.appendChild(main$$);
    const navBtns$$ = document.querySelectorAll('.nav__link');
    for (let btn = 0; btn < navBtns$$.length; btn++) {
        const element = navBtns$$[btn];
        element.addEventListener('click', () => {
            if (!localStorage.hasOwnProperty(urlsToFetch[btn].storageKey)) {
                handleNavBtnClick(btn);
            } 
            
            let arr;
            if (urlsToFetch[btn].storageKey == 'booksStorage') {
                arr = localBooks;
            } else if (urlsToFetch[btn].storageKey == 'charactersStorage') {
                arr = localCharacters;
            } else if (urlsToFetch[btn].storageKey == 'moviesStorage') {
                arr = localMovies;
            } else if (urlsToFetch[btn].storageKey == 'quotesStorage') {
                arr = localQuotes;
            }
            const heroHeader$$ = document.querySelector('section');
            removeElement(heroHeader$$);
            createContent(main$$, arr);
        })
        hero$$.appendChild(mainTitle$$)
        hero$$.appendChild(subTitle$$)
        main$$.appendChild(hero$$);
    }
    
}

const getFooter = (body$$) => {
    const footer$$ = document.createElement('footer');
    const p$$ = document.createElement('p');
    p$$.innerHTML = 'Made by Gerald with LOTR api :)';
    footer$$.appendChild(p$$);
    body$$.appendChild(footer$$);
}

// EXECUTE ON LOAD
window.onload = () => {
    app();
}


const siblings = (elem) => {
    const nodes = [...elem.parentNode.children]
    return nodes.filter(node => node !== elem)
}

const toggleClass = (elem, cls) => {
    elem.classList.toggle(cls);
    siblings(elem).forEach(node => {
        node.classList.remove(cls)
    })
}

const search = (parentNode) => {
    const inputCont$$= document.createElement('div');
    inputCont$$.classList.add('nav__search')
    const input$$ = document.createElement('input');
    input$$.setAttribute('type', 'text')
    input$$.setAttribute('placeholder', 'search...')
    input$$.classList.add('nav__input');

    

    input$$.addEventListener('input', () => {
        const body$$ = document.querySelector('body');
        const container$$ = document.querySelector('.container');
        const hero$$ = document.querySelector('.hero');
        if (input$$.value == '') {
            if (container$$) {
                container$$.remove();
            }
            if (hero$$) {
                hero$$.remove();
            }
            getMain(body$$);
        } else if (input$$.value) {
            let inputValue = input$$.value;
            const elementToFilter = [...localBooks, ...localMovies, ...localCharacters];
            let filteredData = elementToFilter.filter(element => element.name.toLowerCase().includes(inputValue.toLowerCase()))
            if (container$$) {
                container$$.remove();
            }
            if (hero$$) {
                hero$$.remove();
            }
            const main$$ = document.querySelector('main');
            createContent(main$$, filteredData, filteredData);
            const liLink$$ = document.querySelector('.active');
            if (liLink$$) {
                toggleClass(liLink$$, 'active');

            }
        }
        
    })
    inputCont$$.appendChild(input$$);
    parentNode.appendChild(inputCont$$);
}


