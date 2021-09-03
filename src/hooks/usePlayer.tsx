import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";
import * as Configs from "../configs/";
import UIHooks from "./useUI";

import { PlayerProps } from "../types/";
import { SuperConfig } from "../types/enum";

const usePlayer = (
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  uiContainerRef: React.MutableRefObject<HTMLDivElement>,
  props?: PlayerProps
) => {
  const [player, setPlayer] = React.useState<Shaka.Player | null>(null);
  const ui = UIHooks(player, videoRef, uiContainerRef, props);

  React.useEffect(() => {
    Shaka.polyfill.installAll();

    const mainPlayer = new Shaka.Player(videoRef.current);
    setPlayer(mainPlayer);

    return () => {
      mainPlayer.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (player && props.onLoad) {
      props.onLoad({
        player: player,
        ui: ui,
        videoElement: videoRef.current,
      });
    }
  }, [player]);

  React.useEffect(() => {
    if (player && props.config) {
      player.configure(props.config);
    } else if (player && props.superConfig) {
      switch (props.superConfig) {
        case SuperConfig.Streaming:
          player.configure(Configs.streamingConfig.player);
          break;
        default:
          player.configure(props.config);
          break;
      }
    }
  }, [player, props.config]);

  React.useEffect(() => {
    if (player && props.src && Shaka.Player.isBrowserSupported()) {
      const initLoad = async () => {
        try {
          await player.load(props.src);
        } catch (e) {
          props.onPlayerError && props.onPlayerError(e);
        }
      };
      initLoad();
    }
  }, [player, props.src]);

  return { player, ui };
};

export default usePlayer;
