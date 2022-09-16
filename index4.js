const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.post('/login', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if(username == 'mmm' && password == '123'){
        const id = 1; //esse id viria do banco de dados
        const token = generateAccessToken({ username });
        return res.json({ auth: true, token: token });
    }

    res.status(500).json({message: 'Login inválido!'});

});

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

//TODO
/*app.get('/verify', authenticateToken, (req, res) => {
    // executes after authenticateToken
    // ...
})*/

let port = (process.env.PORT || 3000);

app.listen(port, function() {
    console.log('Listening on port: ' + port);

});
