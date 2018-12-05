import React, { Component } from 'react';

//define SearchForm Class
export default class SearchForm extends Component{
    //constructor accepts props and initialises state
    constructor(props) {
        super(props);
        this.state = {

        };
    }

//an event handler for form submit
formSubmitted = (event) => {
    //validate input
    if (event.target.newsSource.value != ""){

        this.props.setNewsSource(event.target.newsSource.value);
    }
    //prevent page reload
    event.preventDefault();
}

//render the form
render(){
    return (
        <div>
            {/*Search Input*/}
            <div id ="search">
            <h3>Enter newsapi.org source</h3>
            {/*Note event handler*/}
            <form onSubmit={this.formSubmitted}>
                {/*The input field*/}
                <input name="newsSource" placeholder="News Source name" type="text" />
                {/*Button click will trigger submit*/}
                <button>Update News</button>
            </form>
            </div>
        </div>
    );
}
}