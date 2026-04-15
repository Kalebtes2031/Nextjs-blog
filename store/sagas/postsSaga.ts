import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import { postsActions } from "../slices/postsSlice";

// FETCH POSTS
function* fetchPostsSaga(action: any): Generator<any, void, any> {
  try {
    const { page } = action.payload;

    const limit = 10;
    const skip = (page - 1) * limit;

    const response = yield call(() =>
      api.get(`/posts?limit=${limit}&skip=${skip}`)
    );

    yield put(
      postsActions.fetchPostsSuccess({
        posts: response.data.posts,
        total: response.data.total,
      })
    );
  } catch (error: any) {
    yield put(
      postsActions.fetchPostsFailure("Failed to fetch posts")
    );
  }
}

// FETCH SINGLE POST
function* fetchPostByIdSaga(action: any): Generator<any, void, any> {
  try {
    const id = action.payload;

    const response = yield call(() => api.get(`/posts/${id}`));

    yield put(postsActions.fetchPostByIdSuccess(response.data));
  } catch (error: any) {
    yield put(postsActions.fetchPostByIdFailure("Failed to fetch post"));
  }
}

// CREATE POST
function* createPostSaga(action: any): Generator<any, void, any> {
  try {
    const { title, body } = action.payload;

    const response = yield call(() =>
      api.post("/posts/add", {
        title,
        body,
        userId: 1,
      })
    );

    yield put(postsActions.createPostSuccess(response.data));
  } catch (error: any) {
    yield put(postsActions.createPostFailure("Failed to create post"));
  }
}

export default function* postsSaga() {
  yield takeLatest(postsActions.fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(
    postsActions.fetchPostByIdRequest.type,
    fetchPostByIdSaga
  );
  yield takeLatest(postsActions.createPostRequest.type, createPostSaga);
}