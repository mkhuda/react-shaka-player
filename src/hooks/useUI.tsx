import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types";

const useUI = (
  player: Shaka.Player,
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  uiContainerRef: React.MutableRefObject<HTMLDivElement>,
  props?: PlayerProps
) => {
  const [ui, setUi] = React.useState<Shaka.ui.Overlay | null>(null);
  React.useEffect(() => {
    if (player) {
      const ui = new Shaka.ui.Overlay(
        player,
        uiContainerRef.current,
        videoRef.current
      );
      setUi(ui);
    }
    return () => {
      if (ui) {
        ui.destroy();
      }
    };
  }, [player]);

  React.useEffect(() => {
    if (ui && props.uiConfig) {
      ui.configure(props.uiConfig);
    }
  }, [ui, props]);

  return ui;
};

export default useUI;
