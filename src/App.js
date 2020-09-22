import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import Input from './Components/Inbox';

const reorder = (list, startIndex, endIndex) =>{
  const result = Array.from(list);
  const removed = result.splice (startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      items: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  };

  onDragEnd(result){
    if(!result.destination){
      return;
    }
   const items = reorder(
    this.state.items,
    result.source.index,
    result.destination.index
  );

  this.setState({
    items
  })
}

  handleFormSubmit = (e) => {
    e.preventDefault();

    let items = [...this.state.items];

    items.push({
      username: this.state.username,
    });

    this.setState({
      items,
      username: ''
    });
  };

  handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    })
  };
  render() {
    
    return (
      <div className="App">
        <Input handleFormSubmit={ this.handleFormSubmit } 
          handleInputChange={ this.handleInputChange }
          newUsername={ this.state.username }
           />

      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) =>(
            <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            >)

            {this.state.items.map((item, index)=>(
              <Draggable key={index} draggableId={`draggable-${index}`}>
                {(provided, snapshot)=>(
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  >
                    {item.username}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
      
           {/* <div  style={{marginLeft: '45%'}}>
        <Table items={ this.state.items }/>
      </div> */}    
      
      </div>
          )}
      </Droppable>
      </DragDropContext>
      </div>
    );
  }
}

export default App;