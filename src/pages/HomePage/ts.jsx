import { useEffect, useState } from "react";
import "./App.css";
//  const [number, setNumber] = useState(5);
//   return (
// <div className="App">
//   <h1>{number}</h1>
//   <button onClick={() => setNumber(1)}>Zmien</button>
// </div>
//   );
// let color = "orange";
// if (props.backgroundColor) {
//   color = props.backgroundColor;
// }
// useEffect(() => {
//   let kartunListNew = [false, false, true, false];
//   kartunListNew[getRandomArbitrary(0, kartunList.length - 1)] = true;
//   setKartunList(kartunListNew);
// }, [kartunList]);

const getRandomArbitrary = (min, max) => {
  // return Math.random() * (max - min) + min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const App = () => {
  const word = "Test jur lak";
  const [kartunList, setKartunList] = useState([false, false, false, false]);
  // kartunList[getRandomArbitrary(0, kartunList.length - 1)] = true;

  return (
    <>
      <p
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          textDecorationLine: "underline",
          textDecorationColor: "orange",
          fontStyle: "italic",
          fontFamily: "monospace",
        }}
      >
        {word}
      </p>
      <button
        onClick={() => {
          setKartunList(kartunList.map((el, index) => (index === getRandomArbitrary(0, 3) ? true : false)));
          console.log(getRandomArbitrary(0, 3));
        }}
      >
        Zagraj ponownie
      </button>
      <div style={{ padding: "15px", display: "flex", flexDirection: "row" }}>
        <div>
          <Box isKartun={kartunList[0]} />
          <Box backgroundColor="teal" isKartun={kartunList[1]} />
        </div>
        <div>
          <Box backgroundColor="cyan" isKartun={kartunList[2]} />
          <Box backgroundColor="gray" isKartun={kartunList[3]} />
        </div>
      </div>
    </>
  );
};
const Box = (props) => {
  const [text, setText] = useState("To je kartun");
  const [color, setColor] = useState(props.backgroundColor ?? "orange");

  return (
    <div
      style={{
        backgroundColor: color,
        color: props.textColor ?? "black",
        height: "200px",
        width: "200px",
        // textAlign: "center",
        boxShadow: "10px 7px 4px black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontFamily: "revert",
        fontWeight: "bold",
        margin: "20px 20px 40px 20px",
      }}
    >
      {text}
      <br />
      <br />
      <button
        onClick={() => {
          setText("A jednak nie");
          setColor("red");
          if (props.isKartun === true) {
            setColor("lime");
            setText("A jednak tak");
          }
        }}
      >
        Sprawdź
      </button>
    </div>
  );
};

export default App;
