import { useState } from "react";
import { useLanguage } from "../query/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { LanguageType } from "../interfaces";

const SelectLanguage = () => {
  const queryClient = useQueryClient();

  const language2 = useLanguage();

  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage || "uz";
  });

  // toggle Language
  const toggleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
    queryClient.invalidateQueries({ type: "all" });
  };

  return (
    <select
      name="languageSelection"
      className="block py-1 px-3 border-[1px] border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
      onChange={toggleLanguage}
      value={language}
    >
      {language2.data?.data &&
        language2.data?.data.map((language: LanguageType) => (
          <option
            value={language.code}
            className="text-gray-900"
            key={language._id}
          >
            {language.code}
          </option>
        ))}
    </select>
  );
};

export default SelectLanguage;
