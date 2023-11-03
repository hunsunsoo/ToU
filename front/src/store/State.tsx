import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type BranchInfo = {
  branchSeq: number | null;
  branchName: string | null;
  branchType: string | null;
};

type UserInfo = {
  accessToken: string | null;
  workerSeq: number | null;
  workerName: string | null;
  workerRole: string | null;
  selectedBranch: BranchInfo;
  branchList: BranchInfo[];
  companySeq: number | null;
  companyName: string | null;
};

/** 유저 정보 저장 */
export const UserInfoState = atom<UserInfo>({
  key: "UserInfoState",
  default: {
    accessToken: null,
    workerSeq: null,
    workerName: null,
    workerRole: null,
    selectedBranch: {
      branchSeq: null,
      branchName: null,
      branchType: null,
    },
    branchList: [],
    companySeq: null,
    companyName: null,
  },
  effects_UNSTABLE: [persistAtom],
});
