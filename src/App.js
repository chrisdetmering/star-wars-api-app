import axios from "axios"; // This will likely need to move
import React from "react";

function App() {
  return (
    <div className="App border">
      <div className="container">
        <p>List of Files:</p>
        <p> Title </p>
        <p> Table </p>
        <p> Row </p>
        <p> Pagenation?</p>
      </div>
    </div>
  );
}

export default App;

// *** DELETE ME WHEN DONE ***

// Axios Example

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       imageURL: "",
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("https://dog.ceo/api/breeds/image/random")
//       .then((response) => {
//         console.log(response.data);
//         this.setState({ imageURL: response.data.message });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     const { imageURL } = this.state;
//     return (
//       <div className="App">
//         <div className="Card border-dark mb-3" style={{ maxWidth: "18rem" }}>
//           <div className="card-body">
//             <h1>"Hello!"</h1>
//             <img src={imageURL} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
