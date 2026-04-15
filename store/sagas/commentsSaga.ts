import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import { commentsActions } from "../slices/commentsSlice";

// FETCH COMMENTS
function* fetchCommentsSaga(action: any): Generator<any, void, any> {
  try {
    const postId = action.payload;

    const response = yield call(() =>
      api.get(`/posts/${postId}/comments`)
    );

    yield put(commentsActions.fetchCommentsSuccess(response.data.comments));
  } catch (error) {
    yield put(commentsActions.fetchCommentsFailure("Failed to load comments"));
  }
}

// ADD COMMENT (fake API behavior)
function* addCommentSaga(action: any): Generator<any, void, any> {
  try {
    const { postId, body } = action.payload;

    const newComment = {
      id: Date.now(),
      body,
      postId,
      user: { username: "you" },
    };

    yield put(commentsActions.addCommentSuccess(newComment));
  } catch (error) {
    yield put(commentsActions.fetchCommentsFailure("Failed to add comment"));
  }
}

export default function* commentsSaga() {
  yield takeLatest(
    commentsActions.fetchCommentsRequest.type,
    fetchCommentsSaga
  );

  yield takeLatest(
    commentsActions.addCommentRequest.type,
    addCommentSaga
  );
}