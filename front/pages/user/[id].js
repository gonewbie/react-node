import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar } from 'antd';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';

const User = ({ id }) => {
  // const router = useRouter();
  // const { id } = router.query;

  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_USER_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1].id,
          data: id,
        });
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts.length}
              </div>,
              <div key="following">
                팔로윙
                <br />
                {userInfo.Followings.length}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers.length}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((c) => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

User.getInitialProps = async (context) => {
  const id = parseInt(context.query.id, 10);
  console.log(`user getinitialProps: ${id}`);
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id,
  });
  return { id };
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

export default User;
