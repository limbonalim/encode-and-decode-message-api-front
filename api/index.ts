import express, { json } from 'express';
import cors from 'cors';

const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;

app.use(json());
app.use(cors());

app.post('/encode', (req, res) => {
	const password = req.body.password;
	const message = req.body.message;
	const answer = {
		encoded: Vigenere.Cipher(password).crypt(message),
	};
	res.send(answer);
});

app.post('/decode', (req, res) => {
	const password = req.body.password;
	const message = req.body.message;
	const answer = {
		decoded: Vigenere.Decipher(password).crypt(message),
	};
	res.send(answer);
});

app.listen(port, () => {
	console.log(`Server started on ${port} port!`);
});
