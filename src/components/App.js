import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({ target: { value } }) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: value
      }
    });
  }

  onFindPetsClick = () => {
    let endpoint = '/api/pets';
    if (this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`;
    }
    fetch(endpoint)
      .then(res => res.json())
      .then(pets => this.setState({ pets }));
  };

  onAdoptPet = (id) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    })
    this.setState({ pets });
  }  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
