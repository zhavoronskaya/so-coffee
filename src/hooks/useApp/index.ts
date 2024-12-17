import { useObservableState } from "@/lib/ObservableState/hooks";
import { AppState } from "@/state";
import { App } from "@/types";

type Props = {
  watch?: Array<keyof App | "*">;
};

const useApp = ({ watch }: Props = {}) => {
  const state = useObservableState(AppState, watch);

  return {
    state,
    setState: AppState.setState,
    getState: AppState.getState,
  };
};

export default useApp;
