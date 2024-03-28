import { Box } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const Icons = ({ children }: PropsWithChildren) => {
  return (
    <Box className=" hover:bg-gray-600 rounded py-1 px-0.5">{children}</Box>
  );
};

export default Icons;
