import React, { Component } from 'react';
import './App.css';
import Pusher from 'pusher-js';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_URL_SENSORES = 'http://localhost:3010/sensores';
const API_URL_UMBRALES = 'http://localhost:3010/umbrales';
const API_URL_ACTUADORES = 'http://localhost:3010/actuadores';
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

handleChange = (event) => {
  this.setState({[event.target.name]: event.target.value});

// alert ('antes de setear: ' + event.target.name + ' ' + event.target.value);
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
  
   
  render() {
  
   
    
    var { isLoaded, isLoaded2, isLoaded3, items1, items2, items3} = this.state;
    if (!isLoaded || !isLoaded2 || !isLoaded3){
      return <div>Cargando...</div>
    }
    
    return (
      
     <div className="todo-wrapper">
      
        <form>
        
        <img src={require('./img/header2.jpg')} alt="imagen Encabezado" with="200" height="100" />
         
          <h4>Sensores</h4>
          {items1.map(item=>( 
              <li  key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.tipo} {item.subtipo}  <span className="badge badge-info badge-pill">{item.medicion}</span> 
              </li>
           
          ))}
          <h4>Configuracion Deseada</h4>
          {items2.map(item=>( 
           <ul className="list-group list-group-flush">
          <li  key={item._id} className="list-group-item d-flex justify-content-between align-items-center"> {item.identificador} {item.descripcion} 
                  <label htmlForm="medicion"></label>
                  <input name="medicion" type="number" min = "10" max = "5000" placeholder={item.valor} onChange={this.handleChange}
                  />
                  <span class="validity"></span>
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={item.habilitado} onChange={this.handleChange}/>
                      <label className="custom-control-label" htmlFor="customSwitch1"></label>
                  </div>
              </li>
              </ul>
          ))}
         <h4>Status Actuadores</h4>
          {items3.map(item=>( 
              <li  key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.tipo} {item.subtipo} <span className="badge badge-success badge-pill"> {item.operacion} </span>             
              </li>
          ))}
       
     
        
        </form>
        

       
        
      </div>
         
    );
  }
}


export default App;
