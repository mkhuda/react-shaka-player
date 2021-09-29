import {
  Player as ShakaPlayer,
  ui as ShakaUI,
  extern as ShakaExtern,
} from "shaka-player/dist/shaka-player.ui";

import { SuperConfig } from "./enum";

export interface MediaTimeStats {
  mediaCurrentTime: number | undefined;
  mediaEndTime: number | undefined;
}

export interface IStats extends MediaTimeStats, ShakaExtern.Stats {}

export interface PlayerRefs {
  player: ShakaPlayer;
  ui: ShakaUI.Overlay;
  videoElement: HTMLVideoElement;
}

export interface PlayerProps {
  src?: string;
  config?: ShakaExtern.PlayerConfiguration | any;
  uiConfig?: ShakaExtern.UIConfiguration | any;
  superConfig?: SuperConfig | undefined;
  autoPlay?: boolean | undefined;
  playsInline?: boolean | undefined;
  children?: any;
  className?: string;
  playerClassName?: string;
  onLoad?(data: PlayerRefs): void | undefined;
  onPlay?(): void | undefined;
  onPause?(): void | undefined;
  onEnded?(): void | undefined;
  onStatsChanged?(stats: IStats): void | undefined;
  onPlayerError?(event: ShakaExtern.Error): void | undefined;
  onBuffering?(event: boolean): void | undefined;
}
