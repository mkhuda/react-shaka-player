import React from "react";
import ReactDOM from "react-dom";
import Player from "react-shaka-player";
import "shaka-player/dist/controls.css";

function App() {
  let playerRef = React.useRef(null);

  // Copyright: https://dashif.org/
  const video =
    "https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd";

  React.useEffect(() => {
    if (playerRef.current) {
      let playerConfigs = playerRef.current;
      console.log(playerConfigs.player);
    }
  }, [playerRef]);

  return (
    <div className="video-container">
      <Player
        className="player-container"
        playerClassName="player-class"
        autoPlay
        src={video}
        ref={playerRef}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
