import { call, put, takeLatest } from "redux-saga/effects";
import { commentsService } from "@/lib/commentsService";
import { commentsActions } from "../slices/commentsSlice";
import { toast } from "react-hot-toast";

function* fetchCommentsSaga(action: {
  type: string;
  payload: number;
}): Generator<any, void, any> {
  try {
    const postId = action.payload;
    const data = yield call(commentsService.getCommentsByPostId, postId);

    yield put(commentsActions.fetchCommentsSuccess(data.comments));
  } catch (error: any) {
    yield put(
      commentsActions.fetchCommentsFailure("Failed to fetch comments")
    );
    toast.error("Failed to load comments");
  }
}

function* addCommentSaga(action: {
  type: string;
  payload: { postId: number; body: string };
}): Generator<any, void, any> {
  try {
    const { postId, body } = action.payload;
    const data = yield call(commentsService.addComment, {
      postId,
      body,
      userId: 1, // Mock user ID, in real app would come from auth state
    });

    yield put(commentsActions.addCommentSuccess(data));
    toast.success("Comment added!");
  } catch (error: any) {
    yield put(commentsActions.addCommentFailure("Failed to add comment"));
    toast.error("Failed to add comment");
  }
}

export default function* commentsSaga(): Generator<any, void, any> {
  yield takeLatest(commentsActions.fetchCommentsRequest.type, fetchCommentsSaga);
  yield takeLatest(commentsActions.addCommentRequest.type, addCommentSaga);
}