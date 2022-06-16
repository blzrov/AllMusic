import Header from "./components/Header";
import TrackIitems from "./components/Track_items";
import "./App.css";
import { useState } from "react";

function App() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "ca03dc8b4amsh8fe919ef52202dbp1412f2jsn8b0561de19b7",
    },
  };
  let [value, setValue] = useState();
  let [data, setData] = useState([]);

  function getApi() {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?" + value, options)
      .then((response) => response.json())
      .then((response) => handleApi(response));
  }

  function handleApi(res) {
    if (res.error || !res) getApi();
    else {
      //setData([...data, ...res.data]);
      res.data.pop();
      setData(res.data);
    }
  }

  return (
    <div className="App">
      <Header></Header>
      <div className="wrapper">
        <h2>Введите запрос</h2>
        <div>
          <input
            type="text"
            placeholder="Oxxxymiron"
            onChange={(event) => setValue("q=" + event.currentTarget.value)}
          ></input>
          <button type="submit" onClick={getApi}>
            ОТПРАВИТЬ
          </button>
        </div>
        <audio src="" controls autoPlay loop></audio>
        <div className="items">
          <TrackIitems data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
