import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import {requestRobots, setSearchField} from "../actions";

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  onSearchPage = (event) => {
    this.setState({
      searchField: event.target.value
    });
  };

  render(){
    const { searchField, setSearchField, robots } = this.props;
    const filterRobots = robots.filter( robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return !robots.length ?
      <h1>Loading</h1>
      : (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={setSearchField} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filterRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      )

  }
}

const mapStateToProps = state => ({
  searchField: state.searchRobots.searchField,
  robots: state.requestRobots.robots,
  isPending: state.requestRobots.isPending,
  error: state.requestRobots.error
});

const mapDispatchToProps = dispatch => ({
  setSearchField: event => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
