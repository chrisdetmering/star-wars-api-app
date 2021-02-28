import axios from "axios"; // This will likely need to move
import React from "react";
import Title from "./components/Title";
import Search from "./components/Search";
import Table from "./components/Table";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      name: "",
      birthDate: "",
      height: "",
      mass: "",
      homeworld: "",
      species: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //This should evetually return all results w/ pagination
  // componentDidMount() {
  //   axios
  //     .get("https://swapi.dev/api/people/1")
  //     .then((response) => {
  //       console.log(response.data);

  //       const characterReturn = {
  //         id: Math.random().toString(36).substr(2, 9),
  //         name: response.data.name,
  //         birthDate: response.data.birth_year,
  //         height: response.data.height,
  //         mass: response.data.mass,
  //         homeWorld: response.data.homeworld,
  //         species: response.data.species,
  //       };

  //       this.setState({
  //         tableData: [...this.state.tableData, characterReturn],
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  handleChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({
      name: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const NEWSEARCH = this.state.name;
    let searchUrl = `https://swapi.dev/api/people/?search=${NEWSEARCH}`;
    console.log(searchUrl);

    axios
      .get(searchUrl)
      .then((response) => {
        console.log("Submit Data", response.data);

        // const characterReturn = {
        //   id: Math.random().toString(36).substr(2, 9),
        //   name: response.data.name,
        //   birthDate: response.data.birth_year,
        //   height: response.data.height,
        //   mass: response.data.mass,
        //   homeWorld: response.data.homeworld,
        //   species: response.data.species,
        // };

        this.setState({
          tableData: [response.data],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App border">
        <div className="container">
          <Title />
          <Search
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            name={this.state.name}
          />
          <Table
            tableData={this.state.tableData}
            name={this.state.name}
            birthData={this.state.birthDate}
            height={this.state.height}
            mass={this.state.mass}
            homeworld={this.state.homeworld}
            species={this.state.species}
          />
        </div>
      </div>
    );
  }
}

export default App;
