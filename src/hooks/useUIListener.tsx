import {
  Player as ShakaPlayer,
  ui as ShakaUI,
} from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";

const useUIListener = (
  ui: ShakaUI.Overlay,
  player: ShakaPlayer,
  props?: PlayerProps
) => {
  React.useEffect(() => {
    if (player && ui) {
      const mediaElement = player.getMediaElement();
      const _onPlay = () => {
        props.onPlay && props.onPlay();
      };
      const _onPause = () => {
        props.onPause && props.onPause();
      };
      const _onEnded = () => {
        props.onEnded && props.onEnded();
      };
      mediaElement.addEventListener("play", _onPlay);
      mediaElement.addEventListener("pause", _onPause);
      mediaElement.addEventListener("ended", _onEnded);
    }
  }, [player, ui]);
};

export default useUIListener;
