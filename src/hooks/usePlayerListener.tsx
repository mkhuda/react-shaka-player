import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";

const usePlayerListener = (player: Shaka.Player, props: PlayerProps) => {
  React.useEffect(() => {
    const _onBufferingEvent = (bufferStatus: any) => {
      const boolOfBuffering: boolean = bufferStatus.buffering;
      props.onBuffering(boolOfBuffering);
    };
    if (player && props.onBuffering) {
      player.addEventListener("buffering", _onBufferingEvent);
    }
  }, [player]);
};

export default usePlayerListener;
