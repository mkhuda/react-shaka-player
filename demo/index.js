import React from "react";
import ReactDOM from "react-dom";
import ReactShakaPlayer from "@mkhuda/react-shaka-player";
import "shaka-player/dist/controls.css";

function App() {
  // Copyright: https://dashif.org/
  const video =
    "https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd";

  return (
    <div className="video-container">
      <ReactShakaPlayer autoPlay={true} playsInline={true} src={video} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
