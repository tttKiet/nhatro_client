const isLoginSelector = (state) => {
  return state.user.isLoggedIn;
};

const curUserLogin = (state) => {
  return state.user.userData;
};

export default { isLoginSelector, curUserLogin };
