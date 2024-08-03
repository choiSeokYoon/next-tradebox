import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: typeof window !== "undefined" ? localStorage : undefined,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: { email: "", id: "", nickname: "" },
  effects_UNSTABLE: [persistAtom],
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const selectedChatRoomState = atom({
  key: "selectedChatRoomState",
  default: null,
});
