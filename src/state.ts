import { App } from "./types";
import createObservableState from "./lib/ObservableState";

export const AppState = createObservableState<App>({
  modal: null,
  selectedCoffee: null,
  hoveredCoffee: null,
  hoveredLocation: "porto1",
  locale: "en",
});
