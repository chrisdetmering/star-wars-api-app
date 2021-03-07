import React from "react";

const Pagination = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => props.paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
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
