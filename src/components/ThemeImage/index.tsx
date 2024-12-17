import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";

const ThemeImage = () => {
  const { theme } = useTheme();
  const src = theme === "dark" ? "/images/logoOutline.png" : "/images/logo.png";
  return (
    <Image
      aria-hidden
      src={src}
      alt="logo"
      width={1125}
      height={1197}
      className="object-cover block h-full w-full"
      priority={true}
    />
  );
};

export default ThemeImage;
