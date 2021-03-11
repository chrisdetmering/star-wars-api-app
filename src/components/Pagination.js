import React from "react";

const Pagination = (props) => {
  //TODO: make pages

  function pages() { 
    const pageNumbers = [];

    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(<li key={i} className="page-item">
      <a
        onClick={() => props.paginate(i)}
        href="!#"
        className="page-link"
      >
        {i}
      </a>
    </li>);
    }

    return pageNumbers; 
  }
 
  return (
    <div>
      <nav>
        <ul className="pagination">
         {pages()}
        </ul>
      </nav>
      <div>
        <p>Total characters found: {props.totalCharacters}</p>
      </div>
      <div></div>
    </div>
  );
};

export default Pagination;
