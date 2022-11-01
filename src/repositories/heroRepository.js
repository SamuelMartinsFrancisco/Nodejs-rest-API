import { readFile, writeFile } from 'node:fs/promises';    // https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback
                                                           // https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfile_path_options_callback
export default class HeroRepository {
    constructor({
        file
    }) {
        this.file = file
    };

    // https://www.javascripttutorial.net/javascript-private-methods/
    async #currentFileContent() {
        return JSON.parse(await readFile(this.file));
    };

    find() {
        return this.#currentFileContent();
    };

    async create(data) {
        const currentFile = await this.#currentFileContent();
        currentFile.push(data);    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    
        await writeFile(
            this.file,
            JSON.stringify(currentFile)
        )

        return data.id;
    };
};

/*
const heroRepository = new HeroRepository({
    file: './database/data.json'
});

console.log(
    await heroRepository.create({
        id: 2,
        name: 'Chapolin'
    })
);

console.log(
    await heroRepository.find()
);
*/