import { storage } from "@vendetta/plugin";

import settings from "./components/Settings";
import modules from "./modules";
import devtools from "./stuff/devtools";

export const vstorage = storage as {
  modules: Record<
    string,
    {
      enabled: boolean;
      options: Record<string, any>;
    }
  >;
};

export const version = "0.3.0";

let undevtool: () => void;

export default {
  onLoad: () => {
    vstorage.modules ??= {};
    modules.forEach((x) => x.storage.enabled && x.start());
    undevtool = devtools();
  },
  onUnload: () => (
    modules.forEach((x) => x.storage.enabled && x.stop()), undevtool?.()
  ),
  settings,
};
