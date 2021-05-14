const Tarea = require("./tarea.class");

class Tareas{

    _listados = {};

    get listadoArr(){

        const listado = [];

        Object.keys(this._listados).forEach( keys => listado.push( this._listados[keys] ) );

        return listado;
    }

    constructor(){
        this._listados = {};
    }

    borrarTarea( id = '' ){
        if(this._listados[id]){
            delete this._listados[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listados[tarea.id] = tarea;
        })

    }

    crearTareas( desc = '' ){

        const tarea = new Tarea(desc);
        this._listados[tarea.id] = tarea;

    }

    listadoCompleto(){

        this.listadoArr.forEach( ( tarea, id ) => {
            const idx = `${ id + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )  ? 'Completada'.green : 'Pendiente'.red;
            console.log( `${ idx }. ${ desc } :: ${ estado }` );
        });
    }

    listarTareasPendientesCompletdas( completadas = true ){

        this.listadoArr.forEach( ( tarea, id ) => {

            const { desc,  completadoEn} = tarea;
            const estado = ( completadoEn )  ? 'Completada'.green : 'Pendiente'.red;
            const idx = `${ id + 1}`.green;

            if( completadas ){

                if(completadoEn){
                    console.log( `${ idx }. ${ desc } :: ${ estado }` );
                }

            }else{

                if(!completadoEn){
                    console.log( `${ idx }. ${ desc } :: ${ estado }` );
                }

            }


        });

    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {

            const tarea = this._listados[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
            
        })
    }

}

module.exports = Tareas