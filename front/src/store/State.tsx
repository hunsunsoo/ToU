import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type UserInfo = {
  accessToken: string | null;
  workerId: string | null;
  workerSeq: number | null;
};

/** 로그인 여부 저장 */
export const LoginState = atom<boolean>({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/** 유저 정보 저장 */
export const UserInfoState = atom<UserInfo>({
  key: "UserInfoState",
  default: {
    accessToken: null,
    workerId: null,
    workerSeq: null,
  },
  effects_UNSTABLE: [persistAtom],
});
