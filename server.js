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

/** POST **/
app.post('/items', jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

/** DELETE **/
app.delete('/items/:id', jsonParser, function (req, res) {
    // Parse the string to an integer
    var id = parseInt(req.params.id);
    console.log(req.params);
    // If no id is received return fail status
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    // Loop through all items in the object
    // If the sent id matches the id in storage splice that
    for (var i = 0; i < storage.items.length; i++) {
        if (id === storage.items[i].id) {
            storage.items.splice(i, 1);
        }
    }
    console.log(req.params.id);
    // Respond with 200 and the json object storage.items
    res.status(200).json(storage.items);
});

/** PUT **/
app.put('/items/:id', jsonParser, function (req, res) {
    var id = parseInt(req.params.id);
    
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    
    for (var i = 0; i < storage.items.length; i++) {
        if (id === storage.items[i].id) {
                //removes object to be updated
            storage.items.splice(i, 1);
                //add new updated object + id
            storage.items.unshift({ name: req.body.name, id: id});
            console.log(req.body.name);
            
        }
    }
    var item = storage.add(req.body.name);
    res.status(200).json(item);
    
});

exports.app = app;
exports.storage = storage;