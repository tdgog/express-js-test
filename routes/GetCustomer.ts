import {getJSONDataFromPacket, runQueryWithReturn} from "../database/DatabaseManager";

const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    void runQueryWithReturn("SELECT * FROM customers WHERE id = ?", [id],
        async function (error, result) {
            res.write(await getJSONDataFromPacket(error, result));
            res.end();
    })
})

module.exports = router;
