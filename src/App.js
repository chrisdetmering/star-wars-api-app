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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseResponse = this.parseResponse.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      name: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const NEWSEARCH = this.state.name;
    let searchUrl = `https://swapi.dev/api/people/?search=${NEWSEARCH}`;

    axios
      .get(searchUrl)
      .then((response) => {
        this.parseResponse(response);
      })
      .catch((error) => {});
  }

  parseResponse(response) {
    const responseData = response.data.results;

    const finalData = responseData.map((databit) => {
      if (databit.species.length === 0) {
        databit.species = "Human";
      } else {
        axios.get(databit.species).then((getspecies) => {
          databit.species = getspecies.data.name;
        });
      }

      axios.get(databit.homeworld).then((getworld) => {
        databit.homeworld = getworld.data.name;
      });

      return databit;
    });

    console.log("Final Data: ", finalData);

    this.setState(
      {
        tableData: finalData,
        name: "",
      },
      () => {
        console.log("Callback data? ", this.state.tableData);
      }
    );
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
            // name={this.state.name}
            // birthData={this.state.birthDate}
            // height={this.state.height}
            // mass={this.state.mass}
            // homeworld={this.state.homeworld}
            // species={this.state.species}
          />
        </div>
      </div>
    );
  }
}

export default App;
