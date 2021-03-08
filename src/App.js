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
    this.apiFetch = this.apiFetch.bind(this);
  }

  componentDidMount() {
    const searchUrl = "https://swapi.dev/api/people/?page=1";
    this.apiFetch(searchUrl);
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
    const searchUrl = `https://swapi.dev/api/people/?search=${newSearch}`;
    this.apiFetch(searchUrl);
  }

  handlePaginate(number) {
    const currentSearch = this.state.name;
    const searchUrl = currentSearch
      ? `https://swapi.dev/api/people/?search=${currentSearch}&page=${number}`
      : `https://swapi.dev/api/people/?page=${number}`;

    this.apiFetch(searchUrl);
  }

  apiFetch(searchUrl) {
    axios
      .get(searchUrl)
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
        if (databit.species.length === 0) {
          databit.species = "Human";
        } else {
          await axios.get(databit.species).then((getspecies) => {
            databit.species = getspecies.data.name;
          });
        }
        await axios.get(databit.homeworld).then((getworld) => {
          databit.homeworld = getworld.data.name;
        });
        return databit;
      })
    );
    return finalData;
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
