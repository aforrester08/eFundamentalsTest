import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';
import TableComponent from './components/TableComponent.js';
import * as serviceWorker from './serviceWorker';
import CloudOptions from './CloudOptions.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      finalArray: [],
      reviewsArray: [],
      counts: {}
    };
    this.handleReviewData = this.handleReviewData.bind(this);
  }

  componentDidMount() {
    const url = "https://raw.githubusercontent.com/Jordanddick/ef-coding-challenge-2/master/reviews.json"

    fetch(url)
    .then(res => res.json())
    .then(resultArray => this.setState({
      reviewsArray: resultArray.reviews.join("\n").toLowerCase().split(/\W+/)
    }))
    .catch(err => console.error)
    .finally(this.handleReviewData);
  }

  handleReviewData() {
    let newState = Object.assign({}, this.state);

    for (let i = 0; i < newState.reviewsArray.length; i++) {
      let word = newState.reviewsArray[i];
      if (!newState.counts.hasOwnProperty(word)) {
        newState.counts[word] = 1;
      } else {
        newState.counts[word] += 1;
      }
    }

    this.setState(newState);

    const dataFinal = Object.keys(this.state.counts).map(key => {
      return {text: key, value: newState.counts[key]}
    });

    this.setState({finalArray: dataFinal})

  }

  render() {
    return(
      <div className="main" style={{ height: 600, width: 600 }}>
        <ReactWordcloud options={CloudOptions} words={this.state.finalArray}/>
        <TableComponent counts={this.state.counts} />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
