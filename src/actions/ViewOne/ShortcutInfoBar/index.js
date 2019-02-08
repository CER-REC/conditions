export const Types = {
  EXPAND_SHORTCUT_INFO_BAR: 'expandShortcutInfoBar',
};

export const ExpandSocialBar = () => ({
  type: Types.EXPAND_SHORTCUT_INFO_BAR,
  payload: { },
});

export const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.EXPAND_SHORTCUT_INFO_BAR: return !state;
    default: return state;
  }
};
