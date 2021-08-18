import React from "react";
import ReactDOM from "react-dom";
import Player from "react-shaka-player";

function App() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    window.getShakaInst = () => ref.current;
  }, []);

  return (
    <div>
      <Player
        ref={ref}
        autoPlay
        src={
          "https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8"
        }
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
