import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {FetchPosts, FetchPostData} from './PostsAPI';
import {IPost} from "./types";

interface PostsState {
  value: IPost[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [] as IPost[],
  status: 'idle',
};

export const getPosts = createAsyncThunk(
  'posts/fetchPosts', async () => {
    const response = await FetchPosts();
    return response;
  }
);

export const getPostData = createAsyncThunk(
  'posts/fetchPostData', async (id: number) => {
    const data = await FetchPostData(id);
    const postData = data.postData;
    const userData = data.userData;
    return {...postData, userCarma: userData.score};
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getPostData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostData.fulfilled, (state, action) => {
        state.status = 'idle';
      });
  },
});

// export const {getPosts} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const postsData = (state: RootState): IPost[] => state.posts.value;

export default postsSlice.reducer;
