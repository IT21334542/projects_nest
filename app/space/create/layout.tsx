import AuthProvider from "@/app/auth/AuthProvider";
import { Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <Flex className=" w-screen h-screen">{children}</Flex>
    </AuthProvider>
  );
};

export default layout;
