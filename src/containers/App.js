import React, { Component } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from './ErrorBoundry';

class App extends Component{
    constructor(){
        super();
        this.state = {
            robots : [],
            searchField : ''
        }
    }

    componentDidMount(){
        fetch("http://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => this.setState({robots : users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField : event.target.value});
    }

    render(){
        const {robots,searchField} = this.state;
        const filterRobot = robots.filter(robots =>{
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return (!robots.length) ? 
        <h2>Loading..</h2> : 
        (
            <div className="tc">
                <h1 className="f1">Robo Friends</h1>
                <Searchbox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                     <CardList robots = {filterRobot}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default App;