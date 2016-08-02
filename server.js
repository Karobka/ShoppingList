var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.listen(process.env.PORT || 8080);

app.post('/items', jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function (req, res) {
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    console.log(req.params.id);
    console.log(Storage.length);
    for (var i = 0; i < Storage.length; i++) {
        console.log(Storage[i].id);
        if (Storage[i].id == req.params.id) {
            Storage.splice(i, 1);
            break;
        }
    }
    res.status(201).json(req.params.name);
});

app.put('items/:id', function (req, res) {
    if (!req.id) {
        return res.sendStatus(400);
    }
    
});