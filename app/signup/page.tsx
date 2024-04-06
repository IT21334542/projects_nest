"use client";
import { Button, Callout, Flex, Strong, Text } from "@radix-ui/themes";
import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import Logo from "../componets/Logo";
import { AiFillGoogleSquare } from "react-icons/ai";
import { FiGithub, FiInfo, FiTwitter, FiXSquare } from "react-icons/fi";

const page = () => {
  const [error, seterror] = useState<boolean>(false);

  return (
    <Flex
      className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
      direction={"column"}
      justify={"center"}
      align={"center"}
    >
      {error && (
        <Flex width={"100%"} justify={"end"} mr={"8"}>
          <Callout.Root
            color="violet"
            size={"3"}
            variant="surface"
            style={{
              background: "#FFC18CB3",
            }}
          >
            <Callout.Icon>
              <FiInfo color="#ffffff" />
            </Callout.Icon>
            <Callout.Text color="red">
              <Flex align={"center"} gap-x={"3"}>
                <Text className=" text-white">
                  {" "}
                  Unable to proceed with this Option
                </Text>
                <FiXSquare
                  className=" hover:bg-yellow-800 cursor-pointer ml-2"
                  color="#ffffff"
                  onClick={() => {
                    seterror(false);
                  }}
                />
              </Flex>
            </Callout.Text>
          </Callout.Root>
        </Flex>
      )}
      <Text className=" text-white" weight={"light"} size={"8"}>
        Sign up and join the <Strong>Canvonest</Strong> community!
      </Text>
      <Text className=" text-white" weight={"light"} size={"3"}>
        "Ready to dive in? Create your account today and start experiencing all
        the features."
      </Text>
      <br />
      <Logo w={200} h={200} />
      <br />
      <br />
      <Flex gap={"4"}>
        <Button
          color="brown"
          size={"3"}
          onClick={() => {
            seterror(true);
          }}
        >
          {" "}
          <FiTwitter color="#ffffff" />
          SignUp with X
        </Button>
        <Button
          color="brown"
          size={"3"}
          onClick={() => {
            signIn();
          }}
        >
          {" "}
          <AiFillGoogleSquare color="#ffffff" />
          SignUp with Google
        </Button>
        <Button
          color="brown"
          size={"3"}
          onClick={() => {
            seterror(true);
          }}
        >
          {" "}
          <FiGithub color="#ffffff" />
          SignUp with GitHub
        </Button>
      </Flex>
    </Flex>
  );
};

export default page;
