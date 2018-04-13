const axios = require('axios');

axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {Authorization: "Client-ID 3f9b22888755abe"},
        data: '0101010010101011111'

    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    })