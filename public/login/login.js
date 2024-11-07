const submitBtn = document.getElementById('registerForm');
const loginBtn = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

submitBtn.addEventListener('click', registrar);
loginBtn.addEventListener('click', login);

async function registrar(e) {
    e.preventDefault();
    window.location.href = './register/register.html';
}

async function login(e) {
    e.preventDefault();

    fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username.value, password: password.value }),
    })
    .then(response => {
        if (response.status === 404) {
            throw new Error('No existent user');
        }

        if (response.status === 403) {
            throw new Error('Password incorrect');
        }

        if (response.status === 400) {
            throw new Error('User and password are needed');
        }

        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = '../map/index.html';
        }
    })
    .catch(error => {
        alert(error.message)
    });
}
