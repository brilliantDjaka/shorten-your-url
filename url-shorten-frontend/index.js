// install express with `npm install express` 
const express = require('express')
const { Deta } = require('deta');

const deta = Deta(); 
const app = express()

app.get('/', (_req, res) => res.sendFile(__dirname+'/index.html'))
app.get('/:id', async (req, res) => {
    const { id } = req.params;

    //insert to db
    const urlDB = deta.Base('urls');
    try {
        const url = await urlDB.get(id);
        return res.redirect(url.value);
    } catch (_error) {
        // if error, then return conflict
        return res.sendStatus(404);
    }
})

// export 'app'
module.exports = app
app.listen(4000)