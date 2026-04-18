import { useSyncExternalStore } from "react";
import { getState, subscribe, type ProgressState } from "./progress";

export const useProgressState = (): ProgressState => {
  return useSyncExternalStore(subscribe, getState, getState);
};
