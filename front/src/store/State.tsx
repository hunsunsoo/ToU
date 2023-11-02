import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type UserInfo = {
  accessToken: string | null;
};

/** 유저 정보 저장(토큰만) */
export const UserInfoState = atom<UserInfo>({
  key: "UserInfoState",
  default: {
    accessToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});
