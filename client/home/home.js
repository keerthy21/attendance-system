
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
        try {
            // Decode the JWT token to get its payload
            const decodedToken = jwt_decode(token);
            console.log(token)
            const username = decodedToken.sub;  // 'sub' is the subject of the token, which is typically the username
            
            // Display the username in the HTML
            document.getElementById('displayUsername').textContent = username;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
         // Logout functionality
       logoutButton.addEventListener('click', function () {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Show logout success message
        logoutMessage.textContent = 'You have successfully logged out.';
        logoutMessage.style.display = 'block'; // Show the message

        // Redirect to the login page after 2 seconds
        setTimeout(function () {
            window.location.href = "../login/login.html"; // Redirect to login page
        }, 2000); // Delay before redirect
    });

    }else{
         window.location.href = "../login/login.html";  // Redirect to login page
        
    }

      

});

