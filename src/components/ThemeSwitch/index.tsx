import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

const ThemeSwitch = () => {
  const { toggleTheme } = useTheme();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleTheme();
  };
  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-white" : "bg-black"
            }`}
          ></div>
          <div
            className={`absolute  left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full  transition ${
              isChecked ? "translate-x-full bg-black" : "bg-white"
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ThemeSwitch;
