import { translations } from "@/translations";
import useApp from "../useApp";
import { App } from "@/types";

type Props = {};

const useTranslations = () => {
  const app = useApp({ watch: ["locale"] });
  const locale = app.state.locale;

  const setLocale = (locale: App["locale"]) => {
    app.setState({ locale });
  };

  return {
    locale,
    setLocale,
    t: translations[locale],
  };
};

export default useTranslations;
