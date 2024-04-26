import { ReactNode } from "react";

const Categories = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <nav className="max-w-md mx-auto px-5 py-2 bg-white sticky top-[75px] z-10 left-0">
      <div className="pb-2 w-full  overflow-scroll" id="StickyCategories">
        <div className="flex  gap-6">{children}</div>
      </div>
    </nav>
  );
};

export default Categories;
