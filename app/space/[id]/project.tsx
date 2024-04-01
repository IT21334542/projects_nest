import { Flex, Tooltip, Text } from "@radix-ui/themes";
import React from "react";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const ProjectSideComponent = () => {
  return (
    <Flex
      className=" h-full ml-3 border-l-2 border-white border-opacity-30"
      direction={"column"}
      p={"3"}
    >
      {/* top bar */}
      <Flex
        className=" w-full h-11 border-b-2 border-white border-opacity-20 "
        justify={"between"}
      >
        <Flex align={"center"} gap={"2"}>
          <Tooltip content="mark">
            <FiCheck
              color=" #ffffff"
              size={"2em"}
              className=" p-1 border border-white"
            />
          </Tooltip>
          <Text className=" text-white font-lg" weight={"medium"}>
            NAme{" "}
          </Text>
        </Flex>
        <Flex>
          <FiArrowRight
            size={"2em"}
            color=" #ffffff"
            // onClick={() => {
            //   taskopen(null);
            // }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectSideComponent;
