import {parse} from 'url';
import express from 'express';

const STATIC_PATH = ['/_next/', '/static/'];

const skipDebugStaticMiddleware = (nextHandler: any): express.Handler => (req, res, next) => {
	if (STATIC_PATH.some(x => req.url.startsWith(x))) {
		const parsedUrl = parse(req.url, true);
		nextHandler(req, res, parsedUrl);
		return;
	}

	next();
};

export default skipDebugStaticMiddleware;
