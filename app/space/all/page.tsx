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
import { FiChevronDown, FiFolder, FiPlus } from "react-icons/fi";
import { BarLoader } from "react-spinners";

function capitalizeFirstLetter(s: String) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface Space {
  name: String;
  id: String;
  description: String;
  createdby: String;
  iconurl: string;
}

const SpaceCard = ({
  title,
  space_id,
  iconurl,
}: {
  title: String;
  space_id: string;
  iconurl: string;
}) => {
  const colorlist: String[] = [
    "bg-[#53B365]",
    "bg-[#978365]",
    "bg-[#B658C4]",
    "bg-[#9EB1FF]",
  ];

  return (
    <>
      <Flex direction={"column"}>
        <Link href={"/space/" + space_id}>
          <Card
            className={`w-44 h-36 max-w-44 max-h-36 ${
              colorlist[Math.floor(Math.random() * colorlist.length)]
            }`}
            variant="ghost"
          >
            {iconurl && (
              <img
                src={iconurl}
                className=" object-cover "
                width={"100%"}
                height={"50%"}
              />
            )}
            {!iconurl && <FiFolder size={"100%"} />}
          </Card>
        </Link>
        <br />
        <Flex gap={"1"} justify={"between"} className=" w-44 max-w-44 ">
          <Text className=" text-white line-clamp-1">{title}</Text>
          <FiChevronDown color="#ffffff" className=" mx-2" />
        </Flex>
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
            console.log("has list of space");
            setisLoading(false);
          }
        })
        .catch((err) => {
          console.log("Log.D error in fetching Spaces :" + err);
          setisLoading(false);
        });
    }
  }, [data]);

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
                <SpaceCard
                  key={index}
                  title={capitalizeFirstLetter(space.name)}
                  space_id={space.id.toString()}
                  iconurl={space.iconurl}
                />
              ))}
            </Grid>
          )}
          {_SpaceList.length == 0 && (
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
        </>
      )}
    </Flex>
  );
};

export default SpaceComponets;
