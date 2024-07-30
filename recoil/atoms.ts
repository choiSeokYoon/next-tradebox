import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
});

export const userEmailState = atom({
  key: "userEmailState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const searchState = atom({
  key: "searchState",
  default: "",
});
