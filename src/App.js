import React, { useState } from "react";
import { observable, action } from "mobx";
import { atom as atomRecoil, useRecoilState } from "recoil";
import { atom as atomJotai, useAtom } from "jotai";
import data from "./data.json";

// state in local variable
let varArray = [];

// state in mobx observable
const appState = {
  items: observable([]),
};

const pushItem = action((state, item) => {
  state.push(item);
});

const replaceArray = action((state, newValue) => {
  // newValue.forEach((item) => {
  //   state.push(item);
  // });
  state.replace(state.concat(newValue));
});

const recoilStateFn = atomRecoil({
  key: "recoilItems",
  default: [],
});

const jotaiAtom = atomJotai([]);

const App = () => {
  const [uiState, setUiState] = useState([]);

  const insertReactHandler = () => {
    setUiState((items) => {
      const copy = [...items];
      copy.push("item1");
      return copy;
    });
    console.log("pushed to react state", uiState.length);
  };

  const updateReactStateHandler = () => {
    setUiState((state) => {
      const copy = [...state];

      return copy.concat(data);
    });

    // react will update state on next render/tick
    console.log("updated React state with items", uiState.length);
    document.getElementById("mobxItems").innerHTML = appState.items.length;
  };

  const insertMobxHandler = () => {
    pushItem(appState.items, "item1");
    console.log("pushed to mobx state", appState.items.length);
    document.getElementById("mobxItems").innerHTML = appState.items.length;
  };

  const updateMobxStateHandler = () => {
    replaceArray(appState.items, data);

    console.log("updated mobx state with items", appState.items.length);
    document.getElementById("mobxItems").innerHTML = appState.items.length;
  };

  const insertVarHandler = () => {
    varArray.push("item1");

    console.log(varArray.length);
    document.getElementById("varItems").innerHTML = varArray.length;
  };

  const updateVarStateHandler = () => {
    varArray = varArray.concat(data);

    console.log(varArray.length);
    document.getElementById("varItems").innerHTML = varArray.length;
  };

  const [recoilState, setRecoilState] = useRecoilState(recoilStateFn);

  const insertRecoilHandler = () => {
    const newState = [...recoilState].concat("item");
    setRecoilState(newState);
    console.log(recoilState.length);
  };

  const updateRecoilHandler = () => {
    const newState = [...recoilState].concat(data);
    setRecoilState(newState);
    console.log("updated recoil state with items", recoilState.length);
  };

  const [jotaiState, setJotaiState] = useAtom(jotaiAtom);

  const insertJotaiHandler = () => {
    const newState = [...jotaiState].concat("item1");
    setJotaiState(newState);
    console.log(jotaiState.length);
  };

  const updateJotailHandler = () => {
    const newState = [...jotaiState].concat(data);
    setJotaiState(newState);
    console.log("updated jotai state with items", jotaiState.length);
  };

  return (
    <div>
      <h1>State performance test</h1>
      <div>
        <h2>State in javascript variable</h2>
        <button onClick={insertVarHandler}>Insert one into var state</button>
        <button onClick={updateVarStateHandler}>
          Update with a lot of items
        </button>
      </div>

      <div>
        <h2>State in react useState</h2>
        <button id="insert-button" onClick={insertReactHandler}>
          Insert one into React state
        </button>
        <button id="generate-button" onClick={updateReactStateHandler}>
          Update with a lot of items
        </button>
      </div>

      <div>
        <h2>State in mobx observable</h2>
        <button onClick={insertMobxHandler}>Insert one into Mobx state</button>
        <button onClick={updateMobxStateHandler}>
          Update with a lot of items
        </button>
      </div>

      <div>
        <h2>State in recoil atoms</h2>
        <button onClick={insertRecoilHandler}>
          Insert one item Recoil state
        </button>
        <button onClick={updateRecoilHandler}>
          Update with a lot of items
        </button>
      </div>

      <div>
        <h2>State in jotai atoms</h2>
        <button onClick={insertJotaiHandler}>
          Insert one item Jotai state
        </button>
        <button onClick={updateJotailHandler}>
          Update with a lot of items
        </button>
      </div>

      <h2>Items count in state</h2>
      <table>
        <thead>
          <tr>
            <th>in var</th>
            <th>in react useState</th>
            <th>in mobx observable</th>
            <th>in recoil atom</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="varItems">0</td>
            <td>{uiState.length}</td>
            <td id="mobxItems">0</td>
            <td>{recoilState.length}</td>
            <td>{jotaiState.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
