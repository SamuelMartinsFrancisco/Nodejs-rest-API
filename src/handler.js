import { join, dirname } from 'node:path';  // join -> https://nodejs.org/api/path.html#pathjoinpaths
import { fileURLToPath, parse } from 'node:url'; // parse -> retorna um objeto com cada parte da url como propriedades -> https://www.w3schools.com/nodejs/nodejs_url.asp
import { DEFAULT_HEADER } from './util/util.js';
import { routes } from './routes/heroRoute.js';
import { generateInstance } from './factories/heroFactory.js';

const currentDir = dirname(
    fileURLToPath(
        import.meta.url
    )
);

const filePath = join(currentDir, './../database', 'data.json');

const heroService = generateInstance({
    filePath
});

const heroRoutes = routes({
    heroService
});

const allRoutes = {
    ...heroRoutes,
    
    // 404 routes -> Não encontrado
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER);    // https://www.geeksforgeeks.org/node-js-response-writehead-method/
        response.write('uuuuuups, not found!');
        response.end();
    }
};

function handler (request, response) {
    const {
        url,
        method 
    } = request;

    console.log(url, method);

    const {
        pathname
    } = parse(url, true);
    
    const treatedPathname = pathname.charAt(pathname.length - 1) === '/' ? 
                            pathname.slice(0, -1) : 
                            pathname;

    const key = () => {
        const urlRegExp = new RegExp(`/heroes/([a-z,0-9,-]{36,36}):${method.toLowerCase()}`);
        const urlHasAnId = urlRegExp.test(`${treatedPathname}:${method.toLowerCase()}`);

        if (urlHasAnId === true) {
            return urlRegExp;
        } 
        return `${treatedPathname}:${method.toLowerCase()}`;
    }
    // validar se o id no corpo da url corresponde ao do objeto

    // if (typeof key() == 'object' && allRoutes[key()].id !=) {}

    console.log(allRoutes[key()]);
    const chosen = allRoutes[key()] || allRoutes.default ;
    return Promise.resolve(chosen(request, response))
    .catch(handlerError(response));
};

function handlerError(response) {
    return error => {
        console.log('something bad has happened**', error.stack);
        response.writeHead(500, DEFAULT_HEADER);
        response.write(JSON.stringify({
            error: 'internal server error!!'
        }));

        return response.end();
    };
};

export default handler;