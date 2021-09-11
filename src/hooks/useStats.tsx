import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";

const useStats = (
  player: Shaka.Player,
  props?: PlayerProps
) => {
  const timer = React.useRef<Shaka.util.Timer | null>(null);
  React.useEffect(() => {
    if (player) {
      const _sendStats = () => {
        const stats_ = player.getStats();
        const mediaCurrentTime =
          player.getMediaElement() &&
          Math.floor(player.getMediaElement().currentTime);
        const mediaEndTime = Math.floor(player.seekRange().end);
        const additionalStats = {
          mediaCurrentTime,
          mediaEndTime,
        };
        
        props.onStatsChanged &&
          props.onStatsChanged({ ...stats_, ...additionalStats });
      };
      const _timer = new Shaka.util.Timer(() => {
        _sendStats();
      });
      _timer.tickEvery(1);
      timer.current = _timer;
    }

    return () => {
      if (player && timer) {
        timer.current.stop();
      }
    };
  }, [player]);
};

export default useStats;
