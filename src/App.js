import React, { Component } from 'react';
import './App.css';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            paras: 4,
            html: true,
            text: ''
        }
    }

    componentWillMount() {
        this.getSampleText();
    }

    getSampleText(){
        axios.get('http://hipsterjesus.com/api?paras='+this.state.paras+'&html='+this.state.html).then((response) => {
            this.setState({text: response.data.text}, function(){
                console.log(this.state);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    showHtml(x) {
        this.setState({html: x}, this.getSampleText);
    }

    changeParas(number) {
        this.setState({paras: number}, this.getSampleText);
    }

  render() {
    return (
      <div className="App container">
        <h1>ReactJS Sample Text Generator</h1>
        <hr />
        <form className="form-inline">
            <div className="form-group">
                <label>Paragraphs:</label>
                <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
            </div>
            <div className="form-group">
                <label>Include HTML:</label>
                <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
            </div>
        </form>
        <Output value={this.state.text} />
        <div className="dev-notes well">
            <h3>Dev Notes:</h3>
            <p>Credit to Brad Traversy for the idea. I used ReactJS and the HipsterJesus ipsum generator API to make this app.</p>
        </div>
      </div>
    );
  }
}

export default App;
