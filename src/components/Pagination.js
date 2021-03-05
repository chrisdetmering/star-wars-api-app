import React from "react";

const Pagination = (props) => {
  //debugger;
  return (
    <div>
      <nav arialabel="Page navigation example">
        <ul className="pagination">
          <li className="page-item"></li>
        </ul>
      </nav>
      <div>
        <p>Current Page: {props.currentPage}</p>
        <p>Total Characters: {props.totalPages}</p>
      </div>
    </div>
  );
};

export default Pagination;
