const express = require('express');
const router = express.Router();

const Developer = require('../models/Developer');
const Game = require('../models/Game');

let isAdded = false;

//Post a new developer
router.post('/', async (req, res) => {

    console.log("called");

    let developer = await Developer.findOne({ name: req.body.name, games: req.body.games,});

    if (developer) {
        return res.status(400).send('The developer: '+req.body.name+' already exisits!');
    } else {
        developer = new Developer({
            name: req.body.name,
            place: req.body.place,
            rating: req.body.rating,
            onlyGameDev: req.body.onlyGameDev,
            games: req.body.games,
        });
        try{
        const saveDeveloper = await developer.save();
        res.json(saveDeveloper);
        }catch(err){
            res.json({message: err})
        }
    }

});

//Get all the developers
//NOTE: Needs limiting and/or slicing
router.get('/', async (req, res) => {
    try{
        const developers = await Developer.find()
        let gamesByDev = (await Game.find({}))
        let table = [];
        developers.forEach(dev => {
            table.push(gamesByDev.filter(item => item.developer == dev.name).reduce((carrier, item) => carrier = {name: item.name, dev: item.developer}, {}));
        });
        developers.forEach(dev => {
            dev.games = [];
            table.forEach(t => {
                if (t.dev == dev.name) {
                    dev.games.push(t.name);
                }
            });
        });
        res.json(developers)
    }catch(err){
        res.json({message: err})
    }
});

//Get each developer games
let item = router.get('/:devsID', async (req, res) =>{
    try{
        let dev = await Developer.findById(req.params.devsID);
        let gamesByDev = (await Game.find({"developer": dev.name}, 'name')).map(item => item.name);
        
        isAdded = true;
        dev.games = gamesByDev
        dev.save()
        res.json(dev);
    }catch(err){
        res.json({message: err});
    }
});

//Delete developer by given id in params
router.delete('/:developerId', async (req, res) =>{
    try{
        const removedDeveloper = await Developer.deleteOne({_id: req.params.developerId});
        res.json(removedDeveloper)
    }catch(err){
        res.json({message: err});
    }
})

//Update a developer with an id from params
//All fields gets updated
//NOTE: If a field is undefined, the value will be null
router.patch('/:developerId', async (req, res) =>{
    try{
        const updatedDeveloper = await Developer.updateOne({_id: req.params.developerId},
            {$set: {
                name: req.body.name,
                place: req.body.place,
                rating: req.body.rating,
                onlyGameDev: req.body.onlyGameDev,
            }
        });
        res.json(updatedDeveloper)
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;
