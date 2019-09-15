import produce from 'immer';

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  me: null, // 내 정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보
  isEditingNickname: false, // 닉네임 변경 시도 중
  editNicknameErrorReason: '',
  hasMoreFollowing: false,
  hasMoreFollower: false,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // Action 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

//
export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      draft.isLoggingIn = true;
      draft.logInErrorReason = '';
      break;
    }
    case LOG_IN_SUCCESS: {
      draft.isLoggingIn = false;
      draft.me = action.data;
      break;
    }
    case LOG_IN_FAILURE: {
      draft.isLoggingIn = false;
      draft.logInErrorReason = action.reason;
      draft.me = null;
      break;
    }
    case LOG_OUT_REQUEST: {
      draft.isLoggingOut = true;
      break;
    }
    case LOG_OUT_SUCCESS: {
      draft.isLoggingOut = false;
      draft.me = null;
      break;
    }
    case LOG_OUT_FAILURE: {
      draft.isLoggingOut = false;
      draft.logOutErrorReason = action.error;
      break;
    }
    case SIGN_UP_REQUEST: {
      draft.isSignedUp = false;
      draft.isSigningUp = true;
      draft.signUpErrorReason = '';
      break;
    }
    case SIGN_UP_SUCCESS: {
      draft.isSignedUp = true;
      draft.isSigningUp = false;
      break;
    }
    case SIGN_UP_FAILURE: {
      draft.isSigningUp = false;
      draft.signUpErrorReason = action.error;
      break;
    }
    case LOAD_USER_REQUEST: {
      break;
    }
    case LOAD_USER_SUCCESS: {
      if (action.me) {
        draft.me = action.data;
        break;
      }
      draft.userInfo = action.data;
      break;
    }
    case LOAD_USER_FAILURE: {
      draft.loadUserErrorReason = action.error;
      break;
    }
    case FOLLOW_USER_REQUEST: {
      break;
    }
    case FOLLOW_USER_SUCCESS: {
      draft.me.Followings.unshift({ id: action.data });
      break;
    }
    case FOLLOW_USER_FAILURE: {
      break;
    }
    case UNFOLLOW_USER_REQUEST: {
      break;
    }
    case UNFOLLOW_USER_SUCCESS: {
      const meFollowingsIndex = draft.me.Followings.findIndex((v) => v.id === action.data);
      draft.me.Followings.splice(meFollowingsIndex, 1);
      const followingListIndex = draft.followingList.findIndex((v) => v.id === action.data);
      draft.followingList.splice(followingListIndex, 1);
      break;
    }
    case UNFOLLOW_USER_FAILURE: {
      break;
    }
    case ADD_POST_TO_ME: {
      draft.me.Posts.unshift({ id: action.data });
      break;
    }
    case REMOVE_POST_TO_ME: {
      const index = draft.me.Posts.findIndex((v) => v.id === action.data);
      draft.me.Posts.splice(index, 1);
      break;
    }
    case LOAD_FOLLOWERS_REQUEST: {
      draft.followerList = !action.offset ? [] : draft.followerList;
      draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true;
      break;
    }
    case LOAD_FOLLOWERS_SUCCESS: {
      action.data.forEach((d) => {
        draft.followerList.push(d);
      });
      draft.hasMoreFollower = action.data.length === 3;
      break;
    }
    case LOAD_FOLLOWERS_FAILURE: {
      break;
    }
    case LOAD_FOLLOWINGS_REQUEST: {
      draft.followingList = !action.offset ? [] : draft.followingList;
      draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing : true;
      break;
    }
    case LOAD_FOLLOWINGS_SUCCESS: {
      action.data.forEach((d) => {
        draft.followingList.push(d);
      });
      draft.hasMoreFollowing = action.data.length === 3;
      break;
    }
    case LOAD_FOLLOWINGS_FAILURE: {
      break;
    }
    case REMOVE_FOLLOWER_REQUEST: {
      break;
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      const meFollowersIndex = draft.me.Followers.findIndex((v) => v.id === action.data);
      draft.me.Followers.splice(meFollowersIndex, 1);
      const followerListIndex = draft.me.Followers.findIndex((v) => v.id === action.data);
      draft.me.followerList.splice(followerListIndex, 1);
      break;
    }
    case REMOVE_FOLLOWER_FAILURE: {
      break;
    }
    case EDIT_NICKNAME_REQUEST: {
      draft.isEditingNickname = true;
      draft.editNicknameErrorReason = '';
      break;
    }
    case EDIT_NICKNAME_SUCCESS: {
      draft.isEditingNickname = false;
      draft.me.nickname = action.data;
      break;
    }
    case EDIT_NICKNAME_FAILURE: {
      draft.isEditingNickname = false;
      draft.editNicknameErrorReason = action.error;
      break;
    }
    default: {
      break;
    }
  }
});

export default reducer;
