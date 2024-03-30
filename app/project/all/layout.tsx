import { Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import NavBar from "../../componets/NavBar";
import SideBar from "../../componets/SideBar";

const SpacePage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex className=" h-screen w-screen m-o p-0 " direction={"column"}>
      <NavBar />
      <Flex className=" w-full h-full">
        <SideBar />
        {children}
      </Flex>
    </Flex>
  );
};

export default SpacePage;
