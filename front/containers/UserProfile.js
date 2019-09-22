import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
        <Link href="/profile" key="twit">
          <a>
            <div>
              짹짹
              <br />
              {me.Posts.length}
            </div>
          </a>
        </Link>,
        <Link href="/profile" key="following">
          <a>
            <div>
              팔로윙
              <br />
              {me.Followings.length}
            </div>
          </a>
        </Link>,
        <Link href="/profile" key="follower">
          <a>
            <div>
              팔로워
              <br />
              {me.Followers.length}
            </div>
          </a>
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
