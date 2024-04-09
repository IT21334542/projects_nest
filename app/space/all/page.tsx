"use client";
import {
  Button,
  Card,
  Flex,
  Grid,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { randomInt } from "crypto";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { FiFolder, FiPlus } from "react-icons/fi";
import { BarLoader } from "react-spinners";

function capitalizeFirstLetter(s: String) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface Space {
  name: String;
  id: String;
  description: String;
  createdby: String;
}

const SpaceCard = ({ title }: { title: String }) => {
  const colorlist: String[] = [
    "bg-[#53B365]",
    "bg-[#978365]",
    "bg-[#B658C4]",
    "bg-[#9EB1FF]",
  ];

  return (
    <>
      <Flex direction={"column"}>
        <Card
          className={`w-44 h-36 max-w-44 max-h-36 ${
            colorlist[Math.floor(Math.random() * colorlist.length)]
          }`}
          variant="ghost"
        >
          <FiFolder size={"100%"} />
        </Card>
        <br />
        <Text className=" text-white">{title}</Text>
      </Flex>
    </>
  );
};

const SpaceComponets = () => {
  const { data } = useSession();
  const [_SpaceList, _setSpaceList] = useState<Space[] | null>(null);
  const [isloading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    setisLoading(true);
    if (data) {
      axios
        .get("/api/space", {
          params: {
            Ur: data?.user.id,
          },
        })
        .then((value) => {
          if (value.status == 200) {
            _setSpaceList(value.data.data);
            setisLoading(false);
          }
        })
        .catch((err) => {
          console.log("Log.D error in fetching Spaces :" + err);
          setisLoading(false);
        });
    }
  }, [data, _SpaceList]);

  return (
    <Flex
      className=" bg-[#1E1F21] w-full h-full py-4 px-5"
      direction={"column"}
    >
      <Text className=" text-white text-3xl" weight={"medium"}>
        WorkSpaces
      </Text>
      <Separator
        mt={"2"}
        size={"4"}
        style={{
          backgroundColor: "#ffffff",
          height: "0.1%",
          opacity: 0.6,
        }}
      />
      <Flex justify={"end"} m={"2"}>
        <Link href={"/space/create"}>
          <Button color="brown">
            <FiPlus color="#ffffff" />
            New WorkSpace
          </Button>
        </Link>
      </Flex>
      {isloading && (
        <Flex
          className=" w-full h-full"
          justify={"center"}
          align={"center"}
          mt={"8"}
        >
          <BarLoader color="#ffffff" />
        </Flex>
      )}
      {!_SpaceList && !isloading && (
        <Flex
          className=" h-full w-full"
          align={"center"}
          justify={"center"}
          direction={"column"}
        >
          <FiFolder color="#ffffff" size={"4em"} className=" m-3" />
          <Text className=" text-white" size={"4"} weight={"light"}>
            {" "}
            No any Workspaces available
          </Text>
          <Text className=" text-white" size={"4"} weight={"light"}>
            {" "}
            Create a <Strong>new Workspace</Strong>
          </Text>
        </Flex>
      )}

      {_SpaceList && !isloading && (
        <>
          {_SpaceList.length != 0 && (
            <Grid columns={"4"} p={"6"} gap={"6"}>
              {_SpaceList.map((space, index) => (
                <Link key={index} href={"/space/" + space.id}>
                  <SpaceCard title={capitalizeFirstLetter(space.name)} />
                </Link>
              ))}
            </Grid>
          )}
        </>
      )}
    </Flex>
  );
};

export default SpaceComponets;
