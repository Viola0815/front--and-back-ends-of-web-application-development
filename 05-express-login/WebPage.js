const webPage = {
    loginHTML: function() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="style.css">
                <title>Login Page</title>
            </head>
            <body>
                <header>
                    <h1>Please Login!</h1>
                </header>   
                <form action="/login" method="POST">
                    <label>
                    <span>Enter your username:</span>
                    <input type="text" name="username" placeholder="Type your username here">
                    </label>
                    <button type="submit">Login</button>
                </form>
            </body>
            </html>
        `;
    },

    LoginFailureHTML: function (errors) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="style.css">
                <title>Login Failure</title>
            </head>
            <body>
                <header>
                    <h1>Oh!not there yet &#128531;</h1>
                </header>   
                <div class="error-messages">
                    <p>${errors}</p>
                    <p>Please go back to<a href="/"> login page </a>to enter your username!</p>                    
                </div>
            </body>
            </html>
        `
    },

    LoginSuccessHTML: function (username,nickname) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Login Successfully</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <header>
                    <h1>&#128512 Welcome!</h1>
                </header> 
                <div class="dataPage">
                    <div class="showData">
                        <p>&#128512 You are logged in as ${username}</p>
                    </div>
                    <div class="nickNameChange">
                        <form action="/change" method="POST">
                            <p>Your current nickname is <span class="nick-name">${nickname !== undefined && nickname !== '' ? nickname : "  "}</span> </p>
                            <label>
                            <input type="text" name="nickname" placeholder="Type to change your new nickname here">
                            </label>
                                <button type="submit">change</button>
                        </form>
                    </div>
                    <div class="logOut">
                        <form action="/logout" method="POST">
                            <button type="submit">Logout</button>
                        </form>
                    </div>                   
                </div>
            </body>
            </html>
        `
    }
    
}

module.exports = webPage;