import React from "react";

const Search = (props) => {
  return (
    <div className="userinput">
      <form onSubmit={props.handleSubmit}></form>
      <form>
        <div className="form-row mb-3">
          <div className="col">
            <input
              id="characterSearch"
              type="text"
              className="form-control"
              placeholder="ex: Darklighter"
              name="characterSearch"
              value={props.name}
              onChange={props.handleChange}
              required
            ></input>
          </div>
          <div>
            <button
              className="btn btn-primary form-control"
              type="submit"
              onClick={props.handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
