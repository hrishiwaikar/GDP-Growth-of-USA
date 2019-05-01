var express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const _ = require('lodash');

/**
 * Asynchronously fetches the data required for populating the GDP
 * Growth graphs on the client
 */
router.get('/graph', async (req, res) => {
    try {
        const url = 'https://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json';

        /** Asynchronously fetch the Worldbank GDP data for US for last 6 years */
        const response = await fetch(url);
        const json = await response.json(response);


        /**Extracting for each year relevant info as an array - GDP Value in USD and the year */
        let relevant_gdp_data = await json[1].reverse().map((annual_gdp) => {
            let annual_relevant_data = _.pick(annual_gdp, ['value', 'date']);
            let updated_annual_data = Object.assign({}, annual_relevant_data, { 'value': parseInt(annual_relevant_data.value) });
            return updated_annual_data;
        });
        res.send(relevant_gdp_data);
    } catch (e) {
        res.status(404).send('Failed getting Gdp Data from worldbank.org: ', e);
    }
})

module.exports = router;