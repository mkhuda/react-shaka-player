# react-shaka-player (Work In Progress) [![Build Status](https://app.travis-ci.com/mkhuda/react-shaka-player.svg?branch=main)](https://app.travis-ci.com/mkhuda/react-shaka-player)

React video player built with [Shaka Player](https://github.com/google/shaka-player).

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/) or [npm](https://www.npmjs.com/) to install `react-shaka-player`.

```bash
yarn add @mkhuda/react-shaka-player

or

npm install @mkhuda/react-shaka-player
```

## Usage

```javascript
import Player from "@mkhuda/react-shaka-player"

function App() {
    return(
        <Player autoPlay={true} src={"https://yourvideohere.mpd"} />
    );
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)