import React, { Component } from 'react';
import './App.css';
import './animate.css';
import Note from './components/Note';



class App extends Component {

  state = {
    notes:[],
    list : [],
    note : '',
    modif: false,
    key : 0,
    delete: false,
  }

  componentWillMount(){
    
    const listS = localStorage.getItem('list')
    if(listS){
      const listP = JSON.parse(listS)
      let notes  = listP.map((val,key)=>{
        return <Note key={key} keyval={key} val={val} delete={()=>this.deleteNote(key)}  edit={()=>this.goToEdit(key)}/>
      })
    this.setState({list:notes})
    this.setState({notes:listP})
    }
    
    
  }

  onChange= event =>{
    this.setState({note: event.target.value})
  }

  // Ajoute une note
  goToNote = e => {
    console.log(this.state.key)
    if(this.state.modif === false){
    e.preventDefault()
    
      var d = new Date();
      this.state.notes.push({'date':d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate(),'note':this.message.value});
      let notes  = this.state.notes.map((val,key)=>{
        return <Note key={key} keyval={key} val={val} delete={()=>this.deleteNote(key)}  edit={()=>this.goToEdit(key)}/>
      })
      // if(this.state.list.length !== 0)
      //   notes.push(this.state.list) 
      this.setState({list : notes })
      this.setState({note:''})
      localStorage.setItem('list',JSON.stringify(this.state.notes))
      console.log('add')
    }
    if(this.state.modif === true & this.state.delete === false){
      e.preventDefault()
     const items = this.state.notes
     items[this.state.key].note = this.state.note
     let notes  = items.map((val,key)=>{
        return <Note key={key} keyval={key} val={val} delete={()=>this.deleteNote(key)}  edit={()=>this.goToEdit(key)}/>
      })
   // if(this.state.list.length !== 0)
     // notes.push(this.state.list) 
     this.setState({list:notes})
     this.setState({note:''})
     this.setState({modif:false})
     this.setState({delete:false})
     localStorage.setItem('list',JSON.stringify(this.state.notes))
    }
    
  }
  // Modifie une note
  goToEdit = key => {
    if(key === this.state.notes.length){
        key -=1
    }
    this.setState({key})
    this.setState({modif:true})
    this.setState({delete:false})
    this.setState({note:this.state.list[key].props.val['note']})
    console.log('edit')
    // console.log(key)
    // console.log(this.state.modif)
    // console.log(this.state.delete)
    // console.log(this.state.key)
  }
  // Supprime une note 
  deleteNote(key){
   
    if(key === this.state.list.length & key >= 0 ){
      key--;
    }
    if(key > this.state.list.length){
      key--;
    }
      
    this.setState({modif:false})
    this.setState({delete:true})
    this.state.list.splice(key,1);
    this.state.notes.splice(key,1);
    // console.log(this.state.notes)
    this.setState({list:this.state.list});
    localStorage.setItem('list',JSON.stringify(this.state.notes))
    console.log('delete')
    // console.log(this.state.delete)
    // console.log(this.state.notes.length)
    // console.log(this.state.list.length)
    // console.log(key)
    }

  render() {

    return (
      <div className="App">
        <h2>TODO</h2>
          <form className="form" onSubmit={e => this.goToNote(e)}>
              <input 
              type="text"
              className="input" 
              ref={input =>{ this.message = input}} 
              value={this.state.note}
              onChange={this.onChange.bind(this)}
              required
              />
              <button type="submit" className="button">Envoyez</button>
          </form>
          <div className="">
              {this.state.list}
          </div>
      </div>
    );
  }
 
}

export default App;
