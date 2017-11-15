import React, { Component } from 'react';


class Note extends Component{

    render (){
        return (
            <div className="Note" >
                <p className="message">{this.props.val.note}</p>
                <p className="date">{this.props.val.date}</p>
                <div className="delete">
                <button className="deleteButton" onClick={this.props.edit}>
                    Modifier
                    </button>
                    <button className="deleteButton" onClick={this.props.delete}>
                    Delete
                    </button>
                </div>
            </div>
        );
    }
}
export default Note;