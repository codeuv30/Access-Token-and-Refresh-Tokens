import React from "react";

const page = async ({ params }) => {
  const param = await params;

  const id = param.id;

  return (
    <div>
      <h1>this is product details of {id}</h1>
    </div>
  );
};

export default page;
