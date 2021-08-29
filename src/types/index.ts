import * as Shaka from "shaka-player/dist/shaka-player.ui";

export interface PlayerRefs {
    player: Shaka.Player;
    ui: Shaka.ui.Overlay;
    videoElement: HTMLVideoElement;
}

export interface PlayerProps {
    src?: string;
    config?: Shaka.extern.PlayerConfiguration | any;
    uiConfig?: Shaka.extern.UIConfiguration | any;
    autoPlay?: boolean | undefined;
    playsInline?: boolean | undefined;
    children?: any;
    className?: string;
    playerClassName?: string;
    onLoad?(data: PlayerRefs): void | undefined;
    onPlay?(): void | undefined;
    onPause?(): void | undefined;
    onEnded?(): void | undefined;
    onStatsChanged?(event: Shaka.extern.Stats): void | undefined;
    onPlayerError?(event: Shaka.extern.Error): void | undefined;
    onBuffering?(event: boolean): void | undefined;
}