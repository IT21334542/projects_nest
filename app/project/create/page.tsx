import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FiFilePlus, FiHardDrive, FiLayout, FiPlus } from "react-icons/fi";

const ProjectCreatepage = () => {
  return (
    <Flex
      className=" h-full w-full overflow-hidden bg-[#292A2C]"
      direction={"column"}
      justify={"center"}
      align={"center"}
    >
      <Text className=" text-white text-3xl">Create a new project</Text>
      <Text className=" text-white text-lg">how would you like to start?</Text>

      <Flex gapX={"4"} mt={"5"}>
        <Link href={"/project/create/newproject"}>
          <Flex direction={"column"} align={"center"}>
            <Box className=" border border-yellow-700 rounded-lg">
              <Card
                variant="ghost"
                className=" h-44 w-44 hover:h-48 hover:w-48 "
              >
                <Flex
                  justify={"center"}
                  align={"center"}
                  className=" w-full h-full"
                >
                  <FiPlus
                    color="#ffffff"
                    size={"60%"}
                    className=" border-2 border-dashed border-white rounded-full"
                  />
                </Flex>
              </Card>
            </Box>
            <Text className=" text-white"> Black Project</Text>
          </Flex>
        </Link>
        <Flex direction={"column"} align={"center"}>
          <Box className=" border border-yellow-700 rounded-lg">
            <Card variant="ghost" className=" h-44 w-44 hover:h-48 hover:w-48">
              <Flex
                justify={"center"}
                align={"center"}
                className=" w-full h-full"
              >
                <FiFilePlus color="#ffffff" size={"60%"} />
              </Flex>
            </Card>
          </Box>
          <Text className=" text-white"> Import SpreadSheet</Text>
        </Flex>
        <Flex direction={"column"} align={"center"}>
          <Box className=" border border-yellow-700 rounded-lg">
            <Card variant="ghost" className=" h-44 w-44 hover:h-48 hover:w-48">
              <Flex
                justify={"center"}
                align={"center"}
                className=" w-full h-full"
              >
                <FiLayout color="#ffffff" size={"60%"} />
              </Flex>
            </Card>
          </Box>
          <Text className=" text-white"> Duplicate Project</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectCreatepage;
