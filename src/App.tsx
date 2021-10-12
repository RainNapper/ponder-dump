import React from 'react';
import './App.css';
import VowelKeyboard from './components/VowelKeyboard';
import { Kana } from './lib/kana';

import Game from './game/Game';

function App() {
  const onPress = (kana: string) => {
    console.log(`Pressed ${kana}`)
  }

  return <Game />
  //   <div className="App">
  //     {/* <header className="App-header"> */}
  //     {/* <VowelKeyboard consonant={Kana.B} onPress={onPress}></VowelKeyboard>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header> */}
  //   </div >
  // );
}

export default App;
