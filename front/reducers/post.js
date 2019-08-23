export const initialState = {
    mainPosts: [{
        User: {
          id: 1,
          nickname: "리액트"
        },
        content: "첫번째 게시글",
        img:
          "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726"
      }],
      imagePaths: [],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
    type: ADD_POST,
};

const addDummy = {

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
            };
        }
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts]
            };
        }
        default:
            return {
                ...state,
            };
    }
}

export default reducer;