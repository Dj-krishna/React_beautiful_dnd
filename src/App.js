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

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "blue",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "green",
  padding: grid,
  width: 250
});


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
            <div className="droppable"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            >
              <h2 className='header'>To Do</h2>
            {this.state.items.map((item, index)=>(
              <Draggable key={index} draggableId={`draggable-${index}`}>
                {(provided, snapshot)=>(
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
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