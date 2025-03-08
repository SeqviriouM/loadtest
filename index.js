const axios = require('axios');
const https = require('https');
const path = require('path');
const dotEnv = require('dotenv');

const dotEnvPath = path.resolve(__dirname, '.env');
dotEnv.config({path: dotEnvPath});

const REQUEST_URL = process.env.REQUEST_URL;
const SLEEP_TIMEOUT = process.env.SLEEP_TIMEOUT || 1000;

const envAxios = axios.create({
     timeout: 10 * 1000,
     httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendRequest() {
	try {
		await envAxios({
			method: 'GET',
			headers: {
				cookie: process.env.COOKIE
			},
			url: REQUEST_URL,
		});

		console.log('SUCCESS');
	} catch (error) {
		console.log('ERROR', error && error.response);
	}
}

async function generatePayload() {
	while (true) {
		await sleep(SLEEP_TIMEOUT);

		sendRequest();
	}
}

generatePayload();
