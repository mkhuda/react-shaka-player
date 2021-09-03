import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";
import * as Configs from "../configs/";

import { PlayerProps } from "../types";
import { SuperConfig } from "../types/enum";

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
    } else if (ui && props.superConfig) {
      switch (props.superConfig) {
        case SuperConfig.STREAMING:
          ui.configure(Configs.streamingConfig.ui);
          break;
        case SuperConfig.VOD:
          ui.configure(Configs.vodConfig.ui);
          break;
        default:
          ui.configure(props.uiConfig);
          break;
      }
    }
  }, [ui, props]);

  return ui;
};

export default useUI;
