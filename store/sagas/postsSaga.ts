import { call, put, takeLatest } from "redux-saga/effects";
import { postsService } from "@/lib/postsService";
import { postsActions } from "../slices/postsSlice";
import { getCache, setCache } from "@/utils/helpers";
import { toast } from "react-hot-toast";

// FETCH POSTS
function* fetchPostsSaga(action: {
  type: string;
  payload: { page: number };
}): Generator<any, void, any> {
  try {
    const { page } = action.payload;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Check cache (only for first page for simplicity, or with page key)
    const cacheKey = `posts_p${page}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      yield put(
        postsActions.fetchPostsSuccess({
          posts: (cachedData as any).posts,
          total: (cachedData as any).total,
          page,
        })
      );
      return;
    }

    const data = yield call(postsService.getPosts, limit, skip);

    // Save to cache (1 hour expiry)
    setCache(cacheKey, data);

    yield put(
      postsActions.fetchPostsSuccess({
        posts: data.posts,
        total: data.total,
        page,
      })
    );
  } catch (error: any) {
    yield put(postsActions.fetchPostsFailure("Failed to fetch posts"));
    toast.error("Failed to load posts");
  }
}

// FETCH SINGLE POST
function* fetchPostByIdSaga(action: {
  type: string;
  payload: number;
}): Generator<any, void, any> {
  try {
    const id = action.payload;
    const cacheKey = `post_${id}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      yield put(postsActions.fetchPostByIdSuccess(cachedData as any));
      return;
    }

    const data = yield call(postsService.getPostById, id);
    setCache(cacheKey, data);

    yield put(postsActions.fetchPostByIdSuccess(data));
  } catch (error: any) {
    yield put(postsActions.fetchPostByIdFailure("Failed to fetch post"));
    toast.error("Failed to load post details");
  }
}

// SEARCH POSTS
function* searchPostsSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    const query = action.payload;
    if (!query) {
      const data = yield call(postsService.getPosts, 10, 0);
      yield put(postsActions.searchPostsSuccess(data.posts));
      return;
    }

    const data = yield call(postsService.searchPosts, query);
    yield put(postsActions.searchPostsSuccess(data.posts));
  } catch (error: any) {
    yield put(postsActions.searchPostsFailure("Failed to search posts"));
  }
}

// CREATE POST
function* createPostSaga(action: {
  type: string;
  payload: { title: string; body: string };
}): Generator<any, void, any> {
  try {
    const { title, body } = action.payload;
    const data = yield call(postsService.createPost, {
      title,
      body,
      userId: 1, // Mock user ID
    });

    yield put(postsActions.createPostSuccess(data));
    toast.success("Post created successfully!");
  } catch (error: any) {
    yield put(postsActions.createPostFailure("Failed to create post"));
    toast.error("Failed to create post");
  }
}

// UPDATE POST
function* updatePostSaga(action: {
  type: string;
  payload: { id: number; data: any };
}): Generator<any, void, any> {
  try {
    const { id, data: updateData } = action.payload;
    const data = yield call(postsService.updatePost, id, updateData);

    yield put(postsActions.updatePostSuccess(data));
    toast.success("Post updated successfully!");
  } catch (error: any) {
    yield put(postsActions.updatePostFailure("Failed to update post"));
    toast.error("Failed to update post");
  }
}

// DELETE POST
function* deletePostSaga(action: {
  type: string;
  payload: number;
}): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(postsService.deletePost, id);

    yield put(postsActions.deletePostSuccess(id));
    toast.success("Post deleted successfully!");
  } catch (error: any) {
    yield put(postsActions.deletePostFailure("Failed to delete post"));
    toast.error("Failed to delete post");
  }
}

export default function* postsSaga(): Generator<any, void, any> {
  yield takeLatest(postsActions.fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(postsActions.fetchPostByIdRequest.type, fetchPostByIdSaga);
  yield takeLatest(postsActions.searchPostsRequest.type, searchPostsSaga);
  yield takeLatest(postsActions.createPostRequest.type, createPostSaga);
  yield takeLatest(postsActions.updatePostRequest.type, updatePostSaga);
  yield takeLatest(postsActions.deletePostRequest.type, deletePostSaga);
}