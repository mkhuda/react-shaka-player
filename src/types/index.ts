import * as Shaka from "shaka-player/dist/shaka-player.ui";

import { SuperConfig } from "./enum";

export interface MediaTimeStats {
    mediaCurrentTime: number | undefined;
    mediaEndTime: number | undefined;
}

export interface IStats extends MediaTimeStats, Shaka.extern.Stats { }

export interface PlayerRefs {
    player: Shaka.Player;
    ui: Shaka.ui.Overlay;
    videoElement: HTMLVideoElement;
}

export interface PlayerProps {
    src?: string;
    config?: Shaka.extern.PlayerConfiguration | any;
    uiConfig?: Shaka.extern.UIConfiguration | any;
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
    onPlayerError?(event: Shaka.extern.Error): void | undefined;
    onBuffering?(event: boolean): void | undefined;
}