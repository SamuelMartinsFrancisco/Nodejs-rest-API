// https://www.youtube.com/watch?v=xR4D2bp8_S0&t=2423s

import http from 'node:http';   // node: -> indica que é um module do node, e não uma biblioteca que precisaria ser instalada;   
import handler from './handler.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handler)
 .listen(PORT, () => console.log(`server is running at ${PORT}`));

export {
    server
}

// https://desenvolvimentoparaweb.com/javascript/this-javascript-dominando/
// 1:15:13 -> checklist