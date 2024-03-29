import { Button, Card, Flex, Grid, Separator, Text } from "@radix-ui/themes";
import { randomInt } from "crypto";
import React from "react";
import { AiFillFolder } from "react-icons/ai";
import { FiFolder, FiPlus } from "react-icons/fi";

const SpaceCard = ({ title }: { title: String }) => {
  const colorlist: String[] = [
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-100",
    "bg-pink-500",
  ];
  const rand = randomInt(0, 3);

  return (
    <>
      <Flex direction={"column"}>
        <Card
          className={`w-44 h-36 max-w-44 max-h-36 ${colorlist[rand]}`}
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
        <Button color="brown">
          <FiPlus color="#ffffff" />
          New WorkSpace
        </Button>
      </Flex>

      <Grid columns={"4"} p={"6"} gap={"6"}>
        <SpaceCard title={"New Project"} />
        <SpaceCard title={"New Project"} />
        <SpaceCard title={"New Project"} />
        <SpaceCard title={"New Project"} />
        <SpaceCard title={"New Project"} />
      </Grid>
    </Flex>
  );
};

export default SpaceComponets;
