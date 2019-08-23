const dummyUser = {
  nickname: "리액트",
  Post: [],
  Followings: [],
  Followers: []
};

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
};

export const LOG_IN = "LOG_IN"; // Action 이름
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";

export const loginAction = {
  type: LOG_IN,
  data: {
    nickname: "리액트"
  }
};
export const logoutAction = {
  type: LOG_OUT
};

export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case SIGN_UP: {
        return {
            ...state,
            signUpData: action.data,
        };
    }
    default:
      return {
        ...state
      };
  }
};

export default reducer;
