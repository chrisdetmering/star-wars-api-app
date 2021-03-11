import axios from "axios";
import React from "react";
import Title from "./components/Title";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      name: "",
      totalCharacters: "",
      totalPages: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.parseResponse = this.parseResponse.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
  }

  componentDidMount() {
    const searchUrl = "https://swapi.py4e.com/api/people/?page=1";
    this.getCharacters(searchUrl);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      name: value,
      currentSearch: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newSearch = this.state.name;
    const searchUrl = `https://swapi.py4e.com/api/people/?search=${newSearch}`;
    this.getCharacters(searchUrl);
  }

  handlePaginate(number) {
    const currentSearch = this.state.name;
    const searchUrl = currentSearch
      ? `https://swapi.py4e.com/api/people/?search=${currentSearch}&page=${number}`
      : `https://swapi.py4e.com/api/people/?page=${number}`;

    this.getCharacters(searchUrl);
  }

  getCharacters(url) {
    axios
      .get(url)
      .then(async (response) => {
        const characters = await this.parseResponse(response);
        const totalPages = Math.ceil(response.data.count / 10);




        this.setState({
          tableData: characters,
          totalCharacters: response.data.count,
          totalPages: totalPages,
        });
      })
      .catch((error) => {});
  }

  parseResponse(response) {
    const responseData = response.data.results;
    const finalData = Promise.all(
      responseData.map(async (databit) => {
        
          databit.species = await this.getSpecies(databit.species); 
          databit.homeworld = await this.getHomeWorld(databit.homeworld); 
        
        return databit;
      })
    );
    return finalData;
  }

  async getHomeWorld(url) { 
    const  response = await axios.get(url)
    return response.data.name; 
  }

  async getSpecies(url) { 
    if (url.length === 0) {
      return "Human";
    } else {
      const response = await axios.get(url[0]); 
      return response.data.name; 
    }
  }



  render() {
    return (
      <div className="App">
        <div className="container p-3 my-3 bg-dark text-white">
          <Title />
          <Search
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            name={this.state.name}
          />
          <Table tableData={this.state.tableData} />
          <Pagination
            totalCharacters={this.state.totalCharacters}
            totalPages={this.state.totalPages}
            paginate={this.handlePaginate}
          />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
