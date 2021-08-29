import * as React from "react";
import * as Hooks from "./hooks";
import * as Shaka from "shaka-player/dist/shaka-player.ui";

import { PlayerProps } from "./types/";

const Player = (props: PlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const uiContainerRef = React.useRef<HTMLDivElement>(null);
  const playerStats = React.useRef<Shaka.extern.Stats | null>(null);

  const { player, ui } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props, playerStats);

  const {
    className,
    playerClassName,
    config,
    uiConfig,
    onLoad,
    onPlay,
    onPause,
    onEnded,
    onBuffering,
    onStatsChanged,
    onPlayerError,
    ...newProps
  } = props;

  const style = {
    maxWidth: "100%",
    width: "100%",
  };

  return (
    <div style={style} ref={uiContainerRef} className={props.className}>
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        {...newProps}
      />
    </div>
  );
};

export default Player as React.FC<PlayerProps>;
