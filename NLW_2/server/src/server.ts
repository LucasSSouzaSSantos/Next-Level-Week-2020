import express from 'express';

const app = express();

app.get('/user', (request, response) => {
    console.log('listagem de usuário');

    response.json([
        'Diego',
        'Lucas',
        'Robson',
        'Daniel',
        'Fabio'
    ]);


});

app.listen(3333);
