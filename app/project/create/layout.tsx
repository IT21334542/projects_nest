import { Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";

const ProjectCreationlayout = ({ children }: { children: ReactNode }) => {
  return <Flex className=" w-screen h-screen">{children}</Flex>;
};

export default ProjectCreationlayout;
