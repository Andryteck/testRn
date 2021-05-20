import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import PostsList from '../components/PostsList';

import {Posts} from '../features/posts/Posts';

declare const global: {HermesInternal: null | {}};

const HomeScreen: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.title}>Hacker News</Text>
        <PostsList />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default HomeScreen;
