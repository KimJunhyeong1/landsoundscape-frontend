import { atom } from "recoil";

const mutedState = atom({
  key: "mutedState",
  default: true,
});

export default mutedState;
