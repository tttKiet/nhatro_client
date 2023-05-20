const isLoginSelector = (state) => {
  return state.isLogined;
};

const curUserLogin = (state) => {
  return state.user.userData.payload;
};

export default { isLoginSelector, curUserLogin };
