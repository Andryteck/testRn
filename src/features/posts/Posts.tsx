import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getPosts, getPostData, postsData} from './PostsSlice';
import {IPost, IResponse} from './types';

export const Posts: React.FC = () => {
  const [data, setData] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const posts = useAppSelector(postsData);

  const status = useAppSelector(state => state.posts.status);
  const dispatch = useAppDispatch();

  const getDataFromApi = async () => {
    dispatch(getPosts());
  };

  const getRandom = (array: IPost[], count: number): number[] => {
    let len = array.length;
    const result = new Array(count);
    const taken = new Array(len);
    if (count > len) {
      throw new RangeError('getRandom: more elements taken than available');
    }
    while (count--) {
      var x = Math.floor(Math.random() * len);
      result[count] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  const sortData = (array: IPost[]) => {
    return array.sort((a, b) => {
      return a.score - b.score;
    });
  };

  const getData = async (list: number[]) => {
    let newDataArray = [];
    setLoading(true);
    for (const item of list) {
      const itemData: IResponse = await dispatch(getPostData(item));
      newDataArray.push(itemData.payload);
    }
    setLoading(false);
    setData(sortData(newDataArray));
  };

  const randomizeItems = (posts: IPost[], count: number) => {
    const postsToDisplay: number[] = getRandom(posts, count);
    getData(postsToDisplay);
  };

  useEffect(() => {
    if (posts.length > 0) {
      randomizeItems(posts, 10);
    }
  }, [posts]);

  const renderItem = (item: IPost) => {
    return (
      <View style={styles.itemWrapper} key={item.id}>
        <Text>Title: {item.title}</Text>
        <Text>Link: {item.url}</Text>
        <Text>Posted: {item.time}</Text>
        <Text>Score: {item.score}</Text>
        <Text>Author: {item.by}</Text>
        <Text>Author karma: {item.userCarma}</Text>
      </View>
    );
  };

  return status !== 'loading' && !loading ? (
    <ScrollView>{data.map(item => renderItem(item))}</ScrollView>
  ) : (
    <ActivityIndicator size="large" color="#a9a9a9" />
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.03)',
    margin: 5,
    borderRadius: 2.5,
  },
});
