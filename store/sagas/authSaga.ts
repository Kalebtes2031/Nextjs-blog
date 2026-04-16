import { call, put, takeLatest, delay, fork, cancel, take } from "redux-saga/effects";
import { authService } from "@/lib/authService";
import { authActions } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import { AUTH_KEYS } from "@/utils/constants";

function* autoLogoutSaga(): Generator<any, void, any> {
  // 5 minutes = 300,000 ms
  yield delay(300000);
  yield put(authActions.logoutRequest());
  toast.error("Session expired. Please login again.");
}

function* loginSaga(action: {
  type: string;
  payload: { username: string; password: string };
}): Generator<any, void, any> {
  try {
    const { username, password } = action.payload;
    const data = yield call(authService.login, { username, password });

    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    };

    const token = data.token;

    // Persist
    localStorage.setItem(AUTH_KEYS.TOKEN, token);
    localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(user));
    document.cookie = `${AUTH_KEYS.TOKEN}=${token}; path=/`;

    yield put(authActions.loginSuccess({ user, token }));
    toast.success(`Welcome back, ${user.username}!`);

    // Start auto-logout timer
    yield fork(watchAutoLogout);
  } catch (error: any) {
    yield put(
      authActions.loginFailure(
        error?.response?.data?.message || "Login failed"
      )
    );
    toast.error(error?.response?.data?.message || "Invalid credentials");
  }
}

function* logoutSaga(): Generator<any, void, any> {
  localStorage.removeItem(AUTH_KEYS.TOKEN);
  localStorage.removeItem(AUTH_KEYS.USER);
  document.cookie = `${AUTH_KEYS.TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  
  yield put(authActions.logout());
  toast.success("Logged out successfully");
}

function* watchAutoLogout(): Generator<any, void, any> {
  const timerTask = yield fork(autoLogoutSaga);
  // If user logs out manually, cancel the auto-logout timer
  yield take(authActions.logoutRequest.type);
  yield cancel(timerTask);
}

export default function* authSaga(): Generator<any, void, any> {
  yield takeLatest(authActions.loginRequest.type, loginSaga);
  yield takeLatest(authActions.logoutRequest.type, logoutSaga);
}