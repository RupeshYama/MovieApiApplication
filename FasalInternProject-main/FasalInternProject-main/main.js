// main.js

const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const contentContainer = document.getElementById('content-container');
const logoutButton = document.getElementById('logout-button');
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.image-container');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (username === 'user' && password === 'password') {
        alert('Login successful');
        loginContainer.style.display = 'none';
        contentContainer.style.display = 'block';
    } else {
        alert('Invalid credentials');
    }
});

logoutButton.addEventListener('click', () => {
    alert('Logged out');
    loginContainer.style.display = 'block';
    contentContainer.style.display = 'none';
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = searchForm.querySelector('input').value;
    searchForm.querySelector('input').value = '';

    if (query == '') {
        query = 'nothing';
    }
    tvMazeApi(query);
});

async function tvMazeApi(query) {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const shows = await res.json();

    makeImages(shows);
}

function makeImages(shows) {
    gallery.innerHTML = ''; 
    for (let show of shows) {
        if (show.show.image) {
            const card = document.createElement('div');
            card.classList.add('movie-card');

            const img = document.createElement('img');
            img.src = show.show.image.medium;
            img.alt = show.show.name;
            card.appendChild(img);

            const info = document.createElement('div');
            info.classList.add('info');

            const title = document.createElement('h3');
            title.textContent = show.show.name;
            info.appendChild(title);

            const summary = document.createElement('p');
            summary.textContent = show.show.summary ? show.show.summary.replace(/<[^>]+>/g, '') : 'No summary available';
            info.appendChild(summary);

            card.appendChild(info);

            gallery.appendChild(card);
        }
    }
}
