import React, { Component } from 'react';
import './App.css';
import Pusher from 'pusher-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ReactSelect from './ReactSelect';

const API_URL_SENSORES = 'http://localhost:3010/sensores';
const API_URL_UMBRALES = 'http://localhost:3010/umbrales';
const API_URL_ACTUADORES = 'http://localhost:3010/actuadores';
const API_URL_CALC = 'http://localhost:5000/calculos';
const PUSHER_APP_KEY = '9456bc135d545fdf5c87';
const PUSHER_APP_CLUSTER = 'mt1';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: ''
    };
    this.addTask = this.addTask.bind(this);
  }

//-----------------------------

grabar = (event) => {

/*
let nam = event.target.name;
let val = event.target.value;
if (nam === "user"){
    this.setState({user: val})
}
if (nam === "password"){
    this.setState({password: val})
}
*/
 const type_temp = this.state.items2.find((item1)=> item1.descripcion === "Temperatura" );
 const type_ilum = this.state.items2.find((item2)=> item2.descripcion === "Iluminacion" );
 
type_temp.valor = this.state.Temperatura;
console.log(type_temp.valor);

type_ilum.valor = this.state.Iluminacion;
console.log(type_ilum.valor);

/***************************************************************************************** */
 //aca va el fetch al registro de temp
 //alert (type_temp.valor);
 fetch(API_URL_UMBRALES, {
  method: 'PATCH', //Hago un Patch para actualizar el umbral de temperatura
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
            },
            body: JSON.stringify(
                        { "id" : type_temp._id,
                          "descripcion" : type_temp.descripcion,
                          "habilitado" : type_temp.habilitado,
                          "identificador" : type_temp.identificador,
                          "token" : type_temp.token,
                          "valor" : type_temp.valor
                          })               
}
      ).then(function(response) {
                              
                              console.log(response);
                              return response.json();
                                }
              );
//aca va el fetch al registro de ilum
//alert (type_ilum.valor);
fetch(API_URL_UMBRALES, {
 method: 'PATCH', //Hago un Patch para actualizar el umbral de temperatura
 headers : { 
   'Content-Type': 'application/json',
   'Accept': 'application/json'
           },
           body: JSON.stringify(
                       { "id" : type_ilum._id,
                         "descripcion" : type_ilum.descripcion,
                         "habilitado" : type_ilum.habilitado,
                         "identificador" : type_ilum.identificador,
                         "token" : type_ilum.token,
                         "valor" : type_ilum.valor
                         })               
}
     ).then(function(response) {
                             
                             console.log(response);
                             return response.json();
                               }
             );

//Inicio Llamada a Api Logica
fetch(API_URL_CALC, {
  method: 'GET', //Hago un Post para crear un nuevo registro
      headers: {
        'Content-Type': 'application/json'
      },
     
        }).then(function(response) {
        
        console.log(response)
        return response.json();
      });

}
//---------------------------------

  addTask(newTask) {
//Cargo valores de sensores
    fetch(API_URL_SENSORES)
    .then (respuesta => respuesta.json() )
    .then (resultado => {
      this.setState({
        isLoaded1: true,
        items1: resultado,
        })
        console.log(resultado);
    })
//Cargo valores de configuracion de umbrales
    fetch(API_URL_UMBRALES)
    .then (respuesta => respuesta.json() )
    .then (resultado => {
      this.setState({
        isLoaded2: true,
        items2: resultado,
      })
      console.log(resultado);
    })
//Cargo estado de actuadores
    fetch(API_URL_ACTUADORES)
    .then (respuesta => respuesta.json() )
    .then (resultado => {
      this.setState({
        isLoaded3: true,
        items3: resultado,
        })
        console.log(resultado);
    })

  }

  componentDidMount() {
    this.pusher = new Pusher(PUSHER_APP_KEY, {
	  cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    this.channel1 = this.pusher.subscribe('sensores');
	  this.channel1.bind('inserted', this.addTask);
    this.channel1.bind('deleted', this.addTask);
    this.channel1.bind('updated', this.addTask);

    this.channel2 = this.pusher.subscribe('umbrales');
    this.channel2.bind('inserted', this.addTask);
    this.channel2.bind('deleted', this.addTask);
    this.channel2.bind('updated', this.addTask);

    this.channel3 = this.pusher.subscribe('actuadores');
    this.channel3.bind('inserted', this.addTask);
    this.channel3.bind('deleted', this.addTask);
    this.channel3.bind('updated', this.addTask);


      fetch(API_URL_SENSORES)
         .then (respuesta => respuesta.json() )
         .then (resultado => {
           this.setState({
             isLoaded: true,
             items1: resultado,
           })
           console.log(resultado);
         })

         fetch(API_URL_UMBRALES)
         .then (respuesta => respuesta.json() )
         .then (resultado => {
           this.setState({
             isLoaded2: true,
             items2: resultado,
             })
             console.log(resultado);
         })

         fetch(API_URL_ACTUADORES)
    .then (respuesta => respuesta.json() )
    .then (resultado => {
      this.setState({
        isLoaded3: true,
        items3: resultado,
        })
        console.log(resultado);
    })

  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});

  //  alert ('actualizo')
  }

/**************************************************************/
/**********     EMPIEZO EL RENDER DE PANTALLA     *************/

  render() {
  
   
// Si no se cargaron los datos de los llamados get a las API muestro un mensaje ...cargando
    var { isLoaded, isLoaded2, isLoaded3, items1, items2, items3} = this.state;
    if (!isLoaded || !isLoaded2 || !isLoaded3){
      return <div>Cargando...</div>
    }

// Si ya estan cargados los datos de la API empiezo el render    
    return (
      <div className="todo-wrapper"> 
        <div className="row">
          <img src={require('./img/smart7.jpg')} alt="imagen Encabezado"  with="500" height="170" className="card-img-top"/>
        </div>
        <Router>
          <div className="btn-group">
            <Link to="/" className="btn btn-primary">
              Sensores
            </Link>
            <Link to="/Configuracion" className="btn btn-primary">
              Config
            </Link>
            <Link to="/Actuadores" className="btn btn-primary">
              Actuadores
            </Link>
            <Link to="/ReactSelect" className="btn btn-primary">
              Reportes
            </Link>
          </div>
        <Switch>
          <Route path="/" exact>
            <form>
              <h4>Sensores</h4>
                {items1.map(item=>( 
                  <li  key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.tipo} {item.subtipo}  <span className="badge badge-info badge-pill">{item.medicion}</span> 
                  </li>))
                }
            </form>
          </Route>
          <Route path="/Configuracion" exact>
            <form>
              <h4>Configuracion Deseada</h4>
                {items2.map(item=>( 
                  <li  key={item._id} className="list-group-item d-flex justify-content-between align-items-center"> {item.descripcion} 
                  <label htmlform={item.descripcion}></label>
                  <input name={item.descripcion} type="number" min = "10" max = "5000" placeholder={item.valor} onChange={this.handleChange}/>
                  <span className="validity"></span>
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id={item._id} defaultChecked={item.habilitado}/>
                      <label className="custom-control-label" htmlFor={item._id}></label>
                    </div>
                  </li>))
                }
                <button type="button" className="btn btn-primary" onClick={this.grabar}>Grabar</button>
            </form>
          </Route>
          <Route path="/Actuadores">
            <form>
               <h4>Status Actuadores</h4>
                {items3.map(item=>( 
                  <li  key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.tipo} {item.subtipo} <span className="badge badge-success badge-pill"> {item.operacion} </span>             
                  </li>))
                }
            </form>
          </Route>
          <Route path="/ReactSelect">
            <ReactSelect/>
          </Route>

          
       </Switch>
     </Router>
     
      </div>
    );
  }
}


export default App;
