"use client";
import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Invitepage = () => {
  const { data } = useSession();
  const Router = useRouter();

  function AcceptRequest() {
    axios
      .patch(
        "/api/invite",
        {},
        {
          params: { Uid: data?.user.id },
        }
      )
      .then((data) => {
        Router.push("/");
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  }

  return (
    <Flex
      className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
      direction={"column"}
      justify={"center"}
      align={"center"}
    >
      <Button
        onClick={() => {
          AcceptRequest();
        }}
      >
        Accept
      </Button>
      <Button>DISCLINE</Button>
    </Flex>
  );
};

export default Invitepage;
