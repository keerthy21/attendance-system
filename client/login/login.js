const apiUrl = 'http://localhost:8080/api';
const token = localStorage.getItem('token');


async function login(apiUrl, username, password) {
    try {


        const response = await fetch(`${apiUrl}/login`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),

        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();

        if (data.status == 200 && data.object != null) {
            localStorage.setItem('token', data.object.token);

            window.location.href = "../home/home.html"
        } else {
            alert(data.msg);
        }

        return data;
    } catch (error) {
        throw error;
    }
}


document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous error messages before validating again
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    usernameError.textContent = '';
    passwordError.textContent = '';


    // Get the username and password from the input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const usernameError = document.getElementById('usernameError');
        const passwordError = document.getElementById('passwordError');
        let isValid = true;
        //username validation
        if (username.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters long.';
            isValid = false;
        } else {
            usernameError.textContent = '';
        }
        // Password validation

        // Password validation: At least 1 lowercase, 1 uppercase, 1 number, and 1 special character
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;
        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        } else if (!passwordPattern.test(password)) {
            passwordError.textContent = 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.';
            isValid = false;
        }
        else {
            passwordError.textContent = '';
        }

        if (isValid) {
            login(apiUrl, username, password)
                .then(data => {
                    console.log('Login successful:', data);
                })
                .catch(error => {
                    console.error('Login failed:', error);
                });
        }



    } else {
        alert('Please enter both username and password');
    }
});

// Show/Hide Password checkbox functionality
document.getElementById('togglePassword').addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});

//redirect to home page if token available
document.addEventListener("DOMContentLoaded", function () {
    if (token) {
        window.location.href = "../home/home.html";

    }
}

)
