import { Flex } from "@radix-ui/themes";
import React from "react";

const SingleSpacePage = ({ params: { id } }: { params: { id: String } }) => {
  return (
    <Flex
      className=" bg-[#1E1F21] w-full h-full py-4 px-5"
      direction={"column"}
    ></Flex>
  );
};

export default SingleSpacePage;
