import { useState } from "react";
import Front from "./Components/StartGame";
import GamePlay from "./Components/GamePlay";

const App = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  }
  
  return (
    <>
        { 
            isGameStarted ? 
            <GamePlay /> : 
            <Front 
            toggle={toggleGamePlay}
            />
        }
    </>
  )
}

export default App;