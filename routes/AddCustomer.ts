import {getJSONDataFromPacket, readPacketAsObject, runQueryWithReturn} from "../database/DatabaseManager";

const express = require('express');
const router = express.Router();

function allValidParameters(params: Array<string>): boolean {
    for(let i = 0; i < params.length; i++)
        if(!params[i])
            return false;
    return true;
}

router.post('/', async (req, res) => {
    const {
        customerName,
        email,
        phoneNumber,
        address,
        postcode
    } = req.query;

    const payload = [customerName, email, phoneNumber, address, postcode];

    if(!allValidParameters(payload)) {
        res.json({ success: false });
        res.end();
        return;
    }

    void runQueryWithReturn("INSERT INTO customers (customerName, email, phoneNumber, address, postcode) VALUES (?, ?, ?, ?, ?)", payload,
        async function (error, result) {
            if(error) {
                console.error(error);
                res.json({ success: false });
                res.end();
                return;
            }
            res.json({success: true});
            res.end();
        })
})

module.exports = router;
