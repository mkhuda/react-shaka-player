import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";
import { SuperConfig } from "../types/enum";

const usePlayerListener = (player: Shaka.Player, props?: PlayerProps) => {
  React.useEffect(() => {
    const _onPlayerErrorEvent = (error: Shaka.extern.Error | any) => {
      props.onPlayerError && props.onPlayerError(error);
    };
    const _onBufferingEvent = (bufferStatus: any) => {
      const boolOfBuffering: boolean = bufferStatus.buffering;
      props.onBuffering && props.onBuffering(boolOfBuffering);
    };
    if (player) {
      player.addEventListener("error", _onPlayerErrorEvent);
      player.addEventListener("buffering", _onBufferingEvent);
    }
  }, [player]);
};

export default usePlayerListener;
