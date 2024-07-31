import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: { email: "", id: "" },
  effects_UNSTABLE: [persistAtom],
});

export const searchState = atom({
  key: "searchState",
  default: "",
});
