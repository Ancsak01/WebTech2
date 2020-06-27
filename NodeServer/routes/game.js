const express = require('express');
const router = express.Router();

const Game = require('../models/Game');

//Post a new game
router.post('/', async (req, res) => {
    const game = new Game({
        name: req.body.name,
        platform: req.body.platform,
        estPlayTime: req.body.estPlayTime,
        developer: req.body.developer,
        sponsoredBy: req.body.sponsoredBy,
    });
    try{
    const saveGame = await game.save();
    res.json(saveGame);
    }catch(err){
        res.json({message: err})
    }
});

//Get all the copies
//NOTE: Needs limiting and/or slicing
router.get('/', async (req, res) => {
    try{
        const games = await Game.find()
        // .populate('owner', ['name', 'email'])
        // .populate({ 
        //     path: 'developer',
        //         select: ['name', 'place'],
        //     // populate: {
        //     //     path: 'sponsor',
        //     //     select: ['name']
        //     // }
        // });

        res.json(games)
    }catch(err){
        res.json({message: err})
    }
});

//Get game by given id in params
router.get('/:gameId', async (req, res) =>{
    try{
        const game = await Game.findById(req.params.gameId)
        // .populate('owner', ['name', 'email'])
        // .populate({ 
        //     path: 'album',
        //     populate: {
        //         path: 'artist'
        //     }});

        res.json(game);
    }catch(err){
        res.json({message: err});
    }
});

//Get artists posted by given user in param
router.get('/owner/:userId', async (req, res) =>{
    try{
        const copies = await Game.find({owner: req.params.userId})
        .populate('owner', ['name', 'email'])
        .populate({ 
            path: 'album',
                select: ['title', 'artist', 'year'],
            populate: {
                path: 'artist',
                select: ['name']
            }});
        res.json(copies);
    }catch(err){
        res.json({message: err});
    }
});

//Delete artist by given id in params
router.delete('/:gameId', async (req, res) =>{
    try{
        const removedGame = await Game.deleteOne({_id: req.params.gameId});
        res.json(removedGame)
    }catch(err){
        res.json({message: err});
    }
})

//Update a game with an id from params
//All fields gets updated
//NOTE: If a field is undefined, the value will be null
router.patch('/:GameId', async (req, res) =>{
    try{
        const updatedGame = await Game.updateOne({_id: req.params.GameId},
            {$set: {
                owner: req.body.owner,
                name: req.body.name,
                platform: req.body.platform,
                estPlayTime: req.body.estPlayTime,
                developer: req.body.developer,
                sponsor: req.body.sponsor
            }
        });
        res.json(updatedGame)
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;
