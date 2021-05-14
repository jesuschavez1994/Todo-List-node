const { v4: uuidv4 } = require('uuid');

class Tarea{

    constructor( desc ){
        this.desc = desc;
        this.id = uuidv4();
        this.completadoEn = null;
    }

}

module.exports = Tarea