import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

import { PlayerProps } from "../types/";

const usePlayer = (
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  uiContainerRef: React.MutableRefObject<HTMLDivElement>,
  props: PlayerProps
) => {
  const [player, setPlayer] = React.useState<Shaka.Player | null>(null);
  const [ui, setUi] = React.useState<Shaka.ui.Overlay | null>(null);

  React.useEffect(() => {
    Shaka.polyfill.installAll();

    const player = new Shaka.Player(videoRef.current);
    setPlayer(player);

    if (player) {
      const ui = new Shaka.ui.Overlay(
        player,
        uiContainerRef.current,
        videoRef.current
      );
      setUi(ui);
    }

    return () => {
      player.destroy();
      if (ui) {
        ui.destroy();
      }
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
