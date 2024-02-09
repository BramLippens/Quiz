npm init -y
npm install express
npm install nodemon -D

# Create a file called index.js

touch index.js

# Open the index.js file and add the following code

const express = require('express');
const app = express();

app.get('/', (req, res) => {
res.send('Hello World');
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
});

# Open the package.json file and add the following code

"scripts": {
"start": "nodemon index.js"
}
