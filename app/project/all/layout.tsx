"use client";
import { Flex } from "@radix-ui/themes";
import React, { ReactNode, useState } from "react";
import NavBar from "../../componets/NavBar";
import SideBar from "../../componets/SideBar";

const SpacePage = ({ children }: { children: ReactNode }) => {
  const [_menuOpen, _setMenuOpen] = useState<boolean>(true);
  return (
    <Flex className=" h-screen w-screen m-o p-0 " direction={"column"}>
      <NavBar indicater={_menuOpen} setter={_setMenuOpen} />
      <Flex className=" w-full h-full">
        <SideBar indicator={_menuOpen} />
        {children}
      </Flex>
    </Flex>
  );
};

export default SpacePage;
