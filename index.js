const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const chat = require('./models/chat');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, resp) => {
    resp.send("app is working");
})

app.get("/chats", async (req, resp) => {
    let chats = await chat.find();
    resp.render("index.ejs", { chats });
    // console.log(chats)
})

app.get("/chats/new", (req, resp) => {
    resp.send(
        `<form action="/chats/new" method="post">
        <h3>Sender : </h3>
        <input required type="text" name="sender" style="width: 50vw;">
        <h3>Receiver : </h3>
        <input type="text" required name="receiver" style="width: 50vw;">
        <h3>Message : </h3>
        <textarea required name="msg" cols="30" rows="3" maxlength="50"></textarea> <br>
        <button>Send Message</button>
    </form>`
    )
})

app.post("/chats/edit/:id", (req, resp) => {
    let id = req.params.id;
    let oldMsg = req.body['oldMsg'];
    // console.log(req.body['oldMsg'])
    resp.send(
        `<form action="/chats/edit/${id}?_method=PATCH" method="post">
        <h3>Message : </h3>
        <textarea  required name="msg" cols="30" rows="3" maxlength="50">${oldMsg}</textarea> <br>
        <button>Edit Message</button>
    </form>`
    )
})

app.patch("/chats/edit/:id", async(req, resp) => {
    let id = req.params.id;
    let newMsg = req.body.msg;
    console.log(req.body.msg)
    let up=await chat.findByIdAndUpdate(id, { msg: newMsg },{runValidators:true,new:true});
    console.log(up)
    resp.redirect("/chats")
})

app.delete("/chats/delete/:id", async(req, resp) => {
    let id = req.params.id;
    let up=await chat.findByIdAndDelete(id);
    console.log(up);
    resp.redirect("/chats")
})



app.post("/chats/new", (req, resp) => {
    let { sender, receiver, msg } = req.body;
    const user1 = new chat({
        from: sender,
        to: receiver,
        msg: msg,
        created_At: new Date()
    })

    user1.save()
        .then((res) => {
            console.log("Success ! ", res);
            resp.redirect("/chats")
        })
        .catch((err) => {
            console.log("Error : ", err);
            resp.send("Error in DB :(");
        })
});

app.listen(8080, () => {
    console.log("server is running on port 8080");
});


// const user1 = new chat({
//     from: 'a',
//     to: 'b',
//     msg: 'hi',
//     created_At: new Date()
// })

// user1.save()
//     .then((resp) => {
//         console.log("Success ! ", resp);
//     })
//     .catch((err) => {
//         console.log("Error : ", err);
//     })