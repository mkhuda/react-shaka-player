# @mkhuda/react-shaka-player [![Build Status](https://app.travis-ci.com/mkhuda/react-shaka-player.svg?branch=main)](https://app.travis-ci.com/mkhuda/react-shaka-player) [![npm version](https://badge.fury.io/js/%40mkhuda%2Freact-shaka-player.svg)](https://badge.fury.io/js/%40mkhuda%2Freact-shaka-player)

React video player built with [Shaka Player](https://github.com/google/shaka-player). 
> [ROADMAP](https://github.com/mkhuda/react-shaka-player/wiki/Initial-Roadmap)

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/) or [npm](https://www.npmjs.com/) to install `react-shaka-player`.

```bash
yarn add @mkhuda/react-shaka-player shaka-player

or

npm install @mkhuda/react-shaka-player shaka-player
```

## Usage

```javascript
import "shaka-player/dist/controls.css";
import Player from "@mkhuda/react-shaka-player";

function App() {
  return <Player autoPlay={true} src={"https://yourvideohere.mpd"} />;
}
```

## Manual Handle Usage

```javascript
function App() {
  let [mainPlayer, setMainPlayer] = useState({});

  useEffect(() => {
    const { player, videoElement } = mainPlayer;

    if (player) {
      async function play() {
        await player.load("https://yourvideomaster.mpd");
        videoElement.play();
      }
      play();
    }
  }, [mainPlayer]);

  return (
    <div className="App">
      <div className="App-main">
        <ReactShakaPlayer
          playerClassName="player-class-name"
          onLoad={(player) => setMainPlayer(player)}
        />
      </div>
    </div>
  );
}
```

## Props

This is main props for the components:

|                |Description                         |Type                         |
|----------------|-------------------------------|-----------------------------|
|src|MPD or HLS to play            |string           |
|config |Changes configuration settings on Shaka Player. See: [Shaka config tutorial](https://shaka-player-demo.appspot.com/docs/api/tutorial-config.html) and [shaka.extern](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html)         |string / object            |
|onLoad |Catch `Shaka.Player`, `Shaka.ui.Overlay` and `HTMLVideoElement` for manual usages or improvement of configuration. see: [PlayerRefs](https://github.com/mkhuda/react-shaka-player/blob/c4459e31027a08165007d03c9a08ff8a3e5de3dc/src/types/index.ts#L3) |object: PlayerRefs => func|
|onBuffering |Catch `onBuffering` status when playing |bool => func|

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
