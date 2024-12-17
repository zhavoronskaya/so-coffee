import useTranslations from "@/hooks/useTranslations";

const LanguageSwitch = () => {
  const { locale, setLocale } = useTranslations();

  return (
    <div className="flex items-center">
      {locale !== "en" && (
        <button
          className="text-4xl sm:text-2xl opacity-40 hover:opacity-100"
          onClick={() => setLocale("en")}
        >
          EN
        </button>
      )}

      {locale !== "pt" && (
        <button
          className="text-4xl sm:text-2xl opacity-40 hover:opacity-100"
          onClick={() => setLocale("pt")}
        >
          PT
        </button>
      )}
    </div>
  );
};

export default LanguageSwitch;
