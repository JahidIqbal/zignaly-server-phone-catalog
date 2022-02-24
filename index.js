const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sbyjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("Zignaly");
        const phonesCollection = database.collection("phones");

        // all api are here let's solve it
        // get services
        app.get('/phones', async (req, res) => {
            const cursor = phonesCollection.find({});
            const phones = await cursor.toArray();
            res.send(phones);
        })
    }

    finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('phone server')
})

app.listen(port, () => {
    console.log('phone server running', port)
})