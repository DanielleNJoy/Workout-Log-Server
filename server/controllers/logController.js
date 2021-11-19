const { Router } = require('express');
const Express = require ('express')
const router = Express.Router();
let validateSession = require('../middleware/jwt_validate');
const { LogModel } = require('../models');

// router.get('/practice', validateSession, (req, res) => {res.send ('Hey! This is a practice route!')
// });

/*

==================
Create Log
==================

*/

router.post('/', validateSession, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description, 
        definition, 
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


/*

==================
Get logs by user
==================

*/

router.get('/', validateSession, async (req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err){
        res.status(404).json ({ error: err});
    }
});

/*

==================
Get logs by id
==================

*/

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try { 
        const results = await LogModel.findAll({
            where: { id: id }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

/*

==================
Update a Log
==================

*/

router.put('/:id', validateSession, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.id;

    const query = {
        where : {
            id: logId,
        }
    };
    const updatedLog = {
        description: description,
        definition: definition, 
        result: result
    };
    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err}) 
       }
});

/*

==================
Delete a log 
==================

*/

router.delete('/:id', validateSession, async (req, res) => {
    // const ownerId =  req.user.owner_id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                // owner_id: ownerId
            }
        };
        await LogModel.destroy(query);
        res.status(200).json({ message: 'Workout Log Entry Deleted'});
    } catch (err){
        res.status(500).json({ error: err});
    }
});

module.exports = router