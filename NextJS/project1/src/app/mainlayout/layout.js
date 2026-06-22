import MainNavbar from "@/components/MainNavbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MainNavbar />
        {children}
      </body>
    </html>
  );
};

export default layout;