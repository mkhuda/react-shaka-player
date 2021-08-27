import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";

const useUIListener = (
  ui: Shaka.ui.Overlay,
  player: Shaka.Player,
  props: PlayerProps
) => {
  React.useEffect(() => {
    if (ui && props.uiConfig) {
      ui.configure(props.uiConfig);
    }
  }, [ui, props]);

  React.useEffect(() => {
    if (player) {
      const mediaElement = player.getMediaElement();
      const _onPlay = () => {
        props.onPlay && props.onPlay();
      };
      const _onPause = () => {
        props.onPause && props.onPause();
      };
      mediaElement.addEventListener("play", _onPlay);
      mediaElement.addEventListener("pause", _onPause);
    }
  }, [player]);
};

export default useUIListener;
