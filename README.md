# @mkhuda/react-shaka-player 
[![Build Status](https://app.travis-ci.com/mkhuda/react-shaka-player.svg?branch=main)](https://app.travis-ci.com/mkhuda/react-shaka-player) [![npm version](https://badge.fury.io/js/%40mkhuda%2Freact-shaka-player.svg)](https://badge.fury.io/js/%40mkhuda%2Freact-shaka-player) ![npm](https://img.shields.io/npm/v/shaka-player?label=shaka-player)

React video player built on top of [Shaka Player](https://github.com/google/shaka-player). 
> [DEMO](https://csb-pygk8-mkhuda.vercel.app/)

> [CODESANDBOX](https://codesandbox.io/s/keen-dewdney-pygk8)

> [ROADMAP](https://github.com/mkhuda/react-shaka-player/wiki/Initial-Roadmap)

> [EXAMPLE & USAGES](https://github.com/mkhuda/react-shaka-player/wiki/Usages-&-Examples)

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/) or [npm](https://www.npmjs.com/) to install `@mkhuda/react-shaka-player`.

```bash
yarn add @mkhuda/react-shaka-player shaka-player

or

npm install @mkhuda/react-shaka-player shaka-player
```

## Usage

```javascript
// import the css. Now we have custom ui.css
import "@mkhuda/react-shaka-player/dist/ui.css";
import { ReactShakaPlayer } from "@mkhuda/react-shaka-player";

function App() {
  return <ReactShakaPlayer autoPlay={true} src={"https://yourvideohere.mpd"} />;
}
```

## Manual Handle Usage

```javascript
import "@mkhuda/react-shaka-player/dist/ui.css";
import { ReactShakaPlayer } from "@mkhuda/react-shaka-player";

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

|Props                |Optional       |Description                         |Type                         |
|----------------|--------|-------------------------------|-----------------------------|
|src|No|MPD or HLS to play            |string           |
|className |Yes| string of ui overlay classname | string |
|autoPlay|Yes| as it described | boolean |
|superConfig|Yes|The special configs for Streaming or VOD. Will add more `superConfig` soon.      | string ("STREAMING" / "VOD")            |
|config |Yes|Changes configuration settings on Shaka Player. Reference: [shaka.extern.PlayerConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.PlayerConfiguration). This config will override `superConfig`.      | object            |
|uiConfig |Yes|Changes configuration settings for UI elements. Reference: [shaka.extern.UIConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.UIConfiguration). This config will override `superConfig`.      | object            |
|onLoad |Yes|Catch `Shaka.Player`, `Shaka.ui.Overlay` and `HTMLVideoElement` for manual usages or improvement of configuration. see: [PlayerRefs](https://github.com/mkhuda/react-shaka-player/blob/c4459e31027a08165007d03c9a08ff8a3e5de3dc/src/types/index.ts#L3) |object: PlayerRefs => func|
|onPlay |Yes|Catch when media is playing |func|
|onPlause |Yes|Catch when media is paused |func|
|onEnded |Yes|Catch when video is end |func|
|onBuffering |Yes|Catch `onBuffering` status when playing |bool => func|
|onPlayerError |Yes|Catch `error` when playing. Reference: [Shaka.Player.ErrorEvent](https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:ErrorEvent) |{Shaka.extern.Error} => func|
|onStatsChanged |Yes|Catch `stats` when playing video, including currentTime (current seek position), and currentEndTime (length of video duration if VOD) (in seconds) of media player element [`IStats`]. Reference: [IStats & Shaka.extern.Stats](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.Stats) |{Shaka.extern.Stats} => func|

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
