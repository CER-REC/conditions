export const Types = {
  SCREENSHOT_MODE: 'ScreenshotMode',
};

export const ScreenshotMode = () => ({
  type: Types.SCREENSHOT_MODE,
  payload: { },
});

// don't display when in screenshot mode
export const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.SCREENSHOT_MODE: return true;
    default: return state;
  }
};
