import {
  Player as ShakaPlayer,
  extern as ShakaExtern,
} from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";

const usePlayerListener = (player: ShakaPlayer, props?: PlayerProps) => {
  React.useEffect(() => {
    const _onPlayerErrorEvent = (error: ShakaExtern.Error | any) => {
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
