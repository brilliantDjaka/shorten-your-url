// install express with `npm install express` 
const express = require('express')
const { Deta } = require('deta');
const deta = Deta(); 
const { isValidHttpUrl, isUrlSafe } = require('./helper')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (_req, res) => res.sendStatus(200))

app.post('/url', async (req,res) => {
    const { id, source } = req.body;

    //validation
    if( !id || !source) return res.sendStatus(400);
    if(!isUrlSafe) return res.status(400).send('not url safe')
    if(!isValidHttpUrl(source)) return res.status(400).send('not valid url')

    //insert to db
    const urlDB = deta.Base('urls');

    try {
        await urlDB.insert(source,id);
    } catch (_error) {
        // if error, then return conflict
        return res.sendStatus(409);
    }

    return res.sendStatus(200);
});

// export 'app'
module.exports = app