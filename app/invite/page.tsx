"use client";
import {
  Button,
  Card,
  Em,
  Flex,
  Grid,
  Inset,
  Quote,
  Strong,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "../componets/Logo";
import Link from "next/link";
import Image from "next/image";

const Invitepage = () => {
  const { data } = useSession();
  const Router = useRouter();
  const [_Invites, _SetInvites] = useState<any | null>(null);
  const [_Refresh, _setRefresh] = useState<Number>(0);

  useEffect(() => {
    if (data) {
      axios
        .get("/api/invite", {
          params: { id: data.user.email },
        })
        .then((value) => {
          if (value.status == 200) {
            const DATA: [] = value.data.data;
            if (DATA.length != 0) {
              _SetInvites(value.data.data);
            } else {
              Router.push("/");
            }
          }
        })
        .catch((err) => {
          console.error("FRONT ERROR INVITE-P " + err);
        });
    }
  }, [_Refresh, data, Router]);

  function AcceptRequest(Iid: string) {
    axios
      .patch(
        "/api/invite",
        {},
        {
          params: { Uid: data?.user.id, Iid: Iid },
        }
      )
      .then((data) => {
        //
        const re: any = _Refresh;
        _setRefresh(re + 1);
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  }

  return (
    <Flex
      className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
      direction={"column"}
      justify={"start"}
      align={"center"}
      p={"5"}
    >
      <Flex className=" w-full h-1/5" justify={"center"} align={"start"}>
        <Text mb={"4"} className=" text-white" size={"9"}>
          Welcome to <Strong>Canvonest!</Strong>
        </Text>
      </Flex>
      <Flex className=" w-full h-3/5" justify={"center"} align={"end"}>
        {_Invites && (
          <Grid columns={"4"} m={"3"}>
            {_Invites.map((invites: any, index: number) => {
              return (
                <Card
                  key={index}
                  size="3"
                  style={{
                    width: "80%",
                  }}
                >
                  <Flex direction={"column"} gapY={"2"}>
                    <Inset clip="padding-box" side="top" pb="current">
                      <img
                        src="https://images.pexels.com/photos/1679618/pexels-photo-1679618.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Invite Image"
                        style={{
                          display: "block",
                          objectFit: "cover",
                          width: "100%",
                          height: 140,
                          backgroundColor: "var(--gray-5)",
                        }}
                      />
                    </Inset>
                    <Text as="p" size="3">
                      <Strong>You are Invited,</Strong>
                    </Text>
                    <Text as="p" size="3">
                      to be a part in the team of{" "}
                      <Em>
                        <Strong>{invites.spaceId.name}</Strong>
                      </Em>{" "}
                      as <Strong>{invites.roleId.name}</Strong> in the Work
                      Space which is Owned by{" "}
                      <Quote>{invites.spaceId.createduser.name}</Quote>
                      <Strong>{}</Strong>
                    </Text>
                    <Button
                      color="brown"
                      onClick={() => {
                        AcceptRequest(invites.id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button color="gray">Hide & Notify Later</Button>
                  </Flex>
                </Card>
              );
            })}
          </Grid>
        )}
      </Flex>
      <Flex
        className=" w-full h-1/5 text-white"
        justify={"center"}
        align={"end"}
      >
        <Flex direction={"column"} align={"center"}>
          <Logo w={100} h={100} />
          <Text>
            {" "}
            <Link
              href={"https://wie-solutions.co.uk/"}
              className=" hover:underline"
            >
              Powered & copyrighted @ <Strong>Wie-Solutions.co.uk</Strong>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Invitepage;
