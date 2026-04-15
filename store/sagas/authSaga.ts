import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import { authActions } from "../slices/authSlice";

function* loginSaga(action: any): Generator<any, void, any> {
  try {
    const { username, password } = action.payload;

    const response = yield call(() =>
      api.post("/auth/login", {
        username,
        password,
      })
    );

    const data = response.data;

    // save token in localStorage
    localStorage.setItem("token", data.token);

    yield put(
      authActions.loginSuccess({
        user: data,
        token: data.token,
      })
    );
  } catch (error: any) {
    yield put(
      authActions.loginFailure(
        error?.response?.data?.message || "Login failed"
      )
    );
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.loginRequest.type, loginSaga);
}