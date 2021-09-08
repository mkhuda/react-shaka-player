import * as React from "react";
import * as Hooks from "../hooks";

import { PlayerProps } from "../types/";

const ReactShakaPlayer = (props: PlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const uiContainerRef = React.useRef<HTMLDivElement>(null);

  const { player, ui } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);

  const {
    className,
    playerClassName,
    superConfig,
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

  const overlayClassName =
    className == undefined ? "mk-theme" : "mk-theme " + props.className;

  return (
    <div style={style} ref={uiContainerRef} className={overlayClassName}>
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        {...newProps}
      />
    </div>
  );
};

export { ReactShakaPlayer };
