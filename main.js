const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', function (req, res)  {
       res.render('index');
})

app.post('/submit-data', function (req, res) {
    res.send('POST Request');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
