const apiUrl = 'http://localhost:8080/api';  // Replace this with your actual API URL

async function login(apiUrl, username, password) {
    try {
        console.log("testing2")

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

        if (data.status ==200 && data.object != null) {
            localStorage.setItem('token', data.object.token);
            
            console.log("Token saved:", data.object.token);
             window.location.href = "../home/home.html"
        } else {
            console.log("testing3")
           alert(data.msg);
        }

        return data;
    } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
    }
}


document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();  // Prevent the default form submission
console.log("testing")
        
      // Clear previous error messages before validating again
      const usernameError = document.getElementById('usernameError');
      const passwordError = document.getElementById('passwordError');
      usernameError.textContent = '';
      passwordError.textContent = '';
      

    // Get the username and password from the input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username)
    console.log(password)
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
    }else {
        usernameError.textContent = '';
    }
     // Password validation

     // Password validation: At least 1 lowercase, 1 uppercase, 1 number, and 1 special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;
     if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    } else if(!passwordPattern.test(password)) {
        passwordError.textContent = 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.';
        isValid = false;    } 
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
        passwordField.type = 'text'; // Show password
    } else {
        passwordField.type = 'password'; // Hide password
    }
});