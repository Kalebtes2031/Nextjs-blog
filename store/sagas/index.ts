import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import postsSaga from "./postsSaga";
import commentsSaga from "./commentsSaga";

export default function* rootSaga() {
  yield all([authSaga(), postsSaga(), commentsSaga()]);
}