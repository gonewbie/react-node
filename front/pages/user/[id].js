import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import { useRouter } from 'next/router';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }, []);

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

export default User;
