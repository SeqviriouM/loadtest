const axios = require('axios');
const https = require('https');
const path = require('path');
const dotEnv = require('dotenv');

const dotEnvPath = path.resolve(__dirname, '.env');
dotEnv.config({path: dotEnvPath});

const TEST_URL = process.env.REQUEST_URL;
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
			url: TEST_URL,
		});

		console.log('SUCCESS');
	} catch (error) {
		console.log('ERROR', error && error.response);
	}
}

async function generatePayload() {
	while (true) {
		await sleep(1000);

		sendRequest();
	}
}

generatePayload();
