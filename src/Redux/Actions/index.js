export const ACTION_TYPES = {
  SET_USER: "SET_USER"
};

export const setUser = (user) => ({
  type: ACTION_TYPES.SET_USER,
  user: user
});
