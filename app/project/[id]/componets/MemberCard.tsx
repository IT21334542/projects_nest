import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

const MemberCard = (a: {
  id: string;
  name: string;
  role: string;
  pic: string;
}) => {
  return (
    <Box width={"50%"} height={"50%"} maxWidth={"50%"}>
      <Card m={"0"} className=" p-0">
        <Flex gap={"3"} align={"center"}>
          <Flex className=" rounded-full   justify-center  ">
            <Avatar size={"4"} radius="large" src={a.pic} fallback />
          </Flex>
          <Flex mt={"3"} className=" h-full" direction={"column"}>
            <Text weight={"medium"}>{a.name}</Text>
            <Text weight={"light"}>{a.role}</Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

export default MemberCard;
