import React, { Component } from 'react';
import './App.css';
import Pusher from 'pusher-js';


//const API_URL = 'http://localhost:9000/api/';
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
 //   this.updateText = this.updateText.bind(this);
 //   this.postTask = this.postTask.bind(this);
 //   this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
 //   this.removeTask = this.removeTask.bind(this);
  }

/*
  updateText(e) {
    this.setState({ task: e.target.value });
  }
*/
 /* 
  postTask(e) {
    e.preventDefault();
    if (!this.state.task.length) {
      return;
    }
    const newTask = {
      task: this.state.task
    };
    alert('A form was submitted: ' + JSON.stringify(this.state));
  //  fetch(API_URL + 'new', {
    fetch(API_URL_SENSORES, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    }).then(console.log);
  }
  */
  
 /* 
  deleteTask(id) {
    fetch(API_URL_SENSORES + id, {
      method: 'delete'
    }).then(console.log);
  }
*/
  addTask(newTask) {

    fetch(API_URL_SENSORES)
    .then (respuesta => respuesta.json() )
    .then (resultado => {
      this.setState({
        isLoaded1: true,
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

 /*
  addTask(newTask) {
    this.setState(prevState => ({
      tasks: prevState.tasks.concat(newTask),
      task: ''
    }));
  }
    
  removeTask(id) {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(el => el.id !== id)
    }));
  }
*/
  componentDidMount() {
    this.pusher = new Pusher(PUSHER_APP_KEY, {
	  cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('sensores');
	
    this.channel.bind('inserted', this.addTask);
    this.channel.bind('deleted', this.addTask);
    this.channel.bind('updated', this.addTask);

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
  
   // let tasks = this.state.tasks.map(item =>
   // <Task key={item._id} task={item} onTaskClick={this.deleteTask} />
   // );
    
    var { isLoaded, isLoaded2, isLoaded3, items1, items2, items3} = this.state;
    if (!isLoaded || !isLoaded2 || !isLoaded3){
      return <div>Cargando...</div>
    }
    
    return (
    
      
      <div className="todo-wrapper">
        <form>
          <h4>Sensores</h4>
        <ul>
          {items1.map(item=>( 
            <li key={item._id}>
              {item.tipo} {item.subtipo} {item.medicion}              
            </li>
          ))}
        </ul>
            <h4>Configuracion Deseada</h4>
            <ul>
          {items2.map(item=>( 
            <li key={item._id}>
              {item.identificador} {item.descripcion} {item.valor}              
            </li>
          ))}
        </ul>
        <h4>Status Actuadores</h4>
            <ul>
          {items3.map(item=>( 
            <li key={item._id}>
              {item.tipo} {item.subtipo} {item.operacion}              
            </li>
          ))}
        </ul>


        </form>
        
      </div>
    );
  }
}

/*
class Task extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }
  _onClick() {
    this.props.onTaskClick(this.props.task.id);
  }
  render() {
    return (
      <li key={this.props.task.id}>
        <div className="text">{this.props.task.task}</div>
        <div className="delete" onClick={this._onClick}>-</div>
      </li>
    );
  }
}

*/
export default App;
