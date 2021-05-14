const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const { 
    inquirerMenu, 
    pausa, leerInput, 
    listadoTareasBorrar, 
    confirmar,
    MostrarListadosCheck } = require('./helpers/inquirer');
const Tarea = require('./models/tarea.class.js');
const Tareas = require('./models/Tareas.class.js');



const main = async() => {

    let  opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB )
    }

    do{

        opt =   await inquirerMenu();

        switch ( opt ) {

            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTareas( desc );
            break;

            case '2':
                console.log( tareas.listadoCompleto() );
            break;

            case '3':
                console.log( tareas.listarTareasPendientesCompletdas( true ));
            break;

            case '4':
                console.log( tareas.listarTareasPendientesCompletdas( false ));
            break;

            case '5':
                const ids = await MostrarListadosCheck(tareas.listadoArr);
                tareas.toggleCompletadas( ids );
                console.log(ids)
            break;

            case '6':

                const id = await listadoTareasBorrar( tareas.listadoArr );
                const ok = await confirmar('¿estas seguro que desea Borrar ?')
                console.log( { ok } );

                if( ok){
                    tareas.borrarTarea( id )
                }

            break;

        
            default:

            break;
        }

        guardarDB( tareas.listadoArr )
        
        await pausa()

    }while( opt !== '0')
    
    // 
}

main();