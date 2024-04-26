let mongoose = require('mongoose');

function getConnect(){
    mongoose.connect('mongodb://localhost/toupiao').then(function(){
        console.log('mongo db connect success');
    }).catch(function (err){
        console.log(`mongo db connect failed , reason : ${err}`);
    });
}

module.exports = getConnect;