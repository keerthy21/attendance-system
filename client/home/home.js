
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
    }

});
