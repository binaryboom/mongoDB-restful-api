const mongoose = require('mongoose');
const chat = require('./models/chat');

main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err) => {
        console.log("Error : ", err);
    });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

chat.insertMany(
    [{
        from: 'amit',
        to: 'sumit',
        msg: 'hi there',
        created_At: new Date()
    },
    {
        from: 'aashika',
        to: 'bhumika',
        msg: 'whats! up',
        created_At: new Date()
    },
    {
        from: 'aakash',
        to: 'baman',
        msg: 'teach me js',
        created_At: new Date()
    }]
)
    .then((resp) => {
        console.log("Success ! ", resp);
    })
    .catch((err) => {
        console.log("Error : ", err);
    })