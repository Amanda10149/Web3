import React, { Component } from 'react';
import Select from 'react-select';

const options = [
    { value: 'cnn', label: 'CNN' },
    { value: 'weather', label: 'Weather' },
    { value: 'brexit', label: 'Brexit' }
];

//define SearchForm Class
export default class SearchSelect extends Component {
    //constructor accepts props and initialises state
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ""

        };
    }



    //an event handler for form submit
    handleChange = (selectedOption) => {
        //validate input

        this.props.setNewsSource(event.target.newsSource.value);
        console.log(`Option selected:`, selectedOption);
    }

    //render the form
    render() {
        const { selectedOption } = this.state.selectedOption;
        return (
            <div>
                {/*Search Input*/}
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
            </div >
        );
    }

}