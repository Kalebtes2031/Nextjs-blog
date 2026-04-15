import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "@/lib/api";
import { authActions } from "../slices/authSlice";

function* loginSaga(action: {
  type: string;
  payload: { username: string; password: string };
}): Generator<any, void, any> {
  try {
    const { username, password } = action.payload;

    // API CALL
    const response = yield call(() =>
      api.post("/auth/login", {
        username,
        password,
      })
    );

    const data = response.data;

    // Extract user object
    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    };

    const token = data.token;

    // persist auth
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    document.cookie = `token=${token}; path=/`;

    // Redux update
    yield put(
      authActions.loginSuccess({
        user,
        token,
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