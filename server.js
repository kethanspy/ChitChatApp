const express = require('express');
const app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
// Since bodyParser is deprecated, it's recommended to use express built-in methods
app.use(express.static(__dirname));
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

const password = encodeURIComponent("Nahtek5984");
const dbUrl = `mongodb+srv://kethanspy:${password}@chitchat.oug3n.mongodb.net/?retryWrites=true&w=majority&appName=ChitChat`;

// var dbUrl = 'mongodb+srv://kethanspy::Nahtek5984@chitchat.oug3n.mongodb.net/?retryWrites=true&w=majority&appName=ChitChat'
var Message = mongoose.model('Message',{
    name:String,
    message:String
})

app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send(messages);
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Internal Server Error
    }
});

// Endpoint to create a new message
app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);
        await message.save();  // Save the message and wait for completion without a callback
        io.emit('message', req.body);  // Emit the message to all connected clients
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);  // Send an HTTP status 500 in case of error
    }
});
 
io.on('connection',(socket) => { 
    console.log('User connected')
})


async function connectDB() {
    try {
        await mongoose.connect(dbUrl);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}
connectDB();
// Start the server
const server = http.listen(3002, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});
