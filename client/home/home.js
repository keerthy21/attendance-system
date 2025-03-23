
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
        try {
            // Decode the JWT token to get its payload
            const decodedToken = jwt_decode(token);
            const username = decodedToken.sub;
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
            logoutMessage.style.display = 'block';

            // Redirect to the login page after 2 seconds
            setTimeout(function () {
                window.location.href = "../login/login.html";
            }, 2000);
        });

    } else {
        window.location.href = "../login/login.html";

    }



});

