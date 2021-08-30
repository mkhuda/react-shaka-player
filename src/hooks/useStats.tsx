import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";

const useStats = (
  player: Shaka.Player,
  statsRef: React.MutableRefObject<Shaka.extern.Stats>,
  props?: PlayerProps,
) => {
  const [timer, setShakaTimer] = React.useState<Shaka.util.Timer | null>(null);
  React.useEffect(() => {
    if (player) {
      const _sendStats = () => {
        const stats_ = player.getStats();
        statsRef.current = stats_;
        props.onStatsChanged && props.onStatsChanged(stats_);
      };
      const _timer = new Shaka.util.Timer(() => {
        _sendStats();
      });
      _timer.tickEvery(1);
      setShakaTimer(_timer);
    }

    return () => {
      if (timer) {
        statsRef.current = null;
        timer.stop();
      }
    };
  }, [player]);
};

export default useStats;
