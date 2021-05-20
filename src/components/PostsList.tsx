import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useViewportUnits, useBounceAnimation} from '../app/hooks';
import {Posts} from '../features/posts/Posts';

const PostsList = () => {
  const {vh} = useViewportUnits();
  const bounce = useBounceAnimation();
  const height = 40 * vh;

  return <Posts />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
export default PostsList;
