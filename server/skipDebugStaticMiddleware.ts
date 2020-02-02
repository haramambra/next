import {parse} from 'url';
import express from 'express';
require('dotenv').config({path: process.cwd() +'/.env'});

const STATIC_PATH = ['/_next/', `/${process.env.STATIC_FOLDER}/`];

const skipDebugStaticMiddleware = (nextHandler: any): express.Handler => (req, res, next) => {
	if (STATIC_PATH.some(x => req.url.startsWith(x))) {
		const parsedUrl = parse(req.url, true);
		nextHandler(req, res, parsedUrl);
		return;
	}

	next();
};

export default skipDebugStaticMiddleware;
