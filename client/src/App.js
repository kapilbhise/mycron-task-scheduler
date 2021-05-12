import { Fragment } from "react";
import "./App.css";
import InputTask from "./components/InputTask";
import ListTask from "./components/ListTask";

function App() {
  return (
    <Fragment>
      <InputTask />
      <ListTask />
    </Fragment>
  );
}

export default App;
