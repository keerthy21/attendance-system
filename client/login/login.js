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
    // Get the username and password from the input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Call the login function
        login(apiUrl, username, password)
            .then(data => {
                console.log('Login successful:', data);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    } else {
        alert('Please enter both username and password');
    }
});