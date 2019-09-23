import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const FollowButton = ({
  post, onFollow, onUnfollow,
}) => {
  const { me } = useSelector((state) => state.user);
  return (
    !me || post.User.id === me.id
      ? null
      : me.Followings && me.Followings.find((v) => v.id === post.User.id)
        ? <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
        : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
};

export default FollowButton;
