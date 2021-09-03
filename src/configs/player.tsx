const streamingConfig = {
  player: {
    manifest: {
      dash: {
        ignoreMinBufferTime: true,
      },
    },
    streaming: {
      lowLatencyMode: true,
      inaccurateManifestTolerance: 0,
      bufferingGoal: 10,
      rebufferingGoal: 1,
    },
  },
  ui: {
    addSeekBar: false,
    controlPanelElements: ["time_and_duration", "mute", "fullscreen"],
    addBigPlayButton: true,
  },
};

const vodConfig = {
  ui: {
    controlPanelElements: ["time_and_duration", "mute", "fullscreen"],
    addBigPlayButton: true,
  },
};

export { streamingConfig, vodConfig };
