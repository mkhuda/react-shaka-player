import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types/";

const useCallback = (player: Shaka.Player, props: PlayerProps) => {
  React.useEffect(() => {
    if (player && props.onBuffering) {
      const _onBufferingEvent = (bufferStatus: any) => {
        const boolOfBuffering: boolean = bufferStatus.buffering;
        props.onBuffering(boolOfBuffering);
      };
      player.addEventListener("buffering", _onBufferingEvent);
    }
  }, [player, props.onBuffering]);
};

export default useCallback;
