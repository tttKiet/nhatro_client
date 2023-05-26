const isLoginSelector = (state) => {
  return state.user.isLoggedIn;
};

const curUserLogin = (state) => {
  return state.user.userData.payload;
};

export default { isLoginSelector, curUserLogin };
