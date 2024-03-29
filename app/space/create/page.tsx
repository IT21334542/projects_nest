import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React from "react";
import { FiArrowLeft, FiChevronsLeft, FiPlus } from "react-icons/fi";

const page = () => {
  return (
    <Flex className=" bg-[#292A2C] w-screen h-screen" direction={"column"}>
      <Grid columns={"2"} height={"100%"}>
        <Box p={"6"}>
          <FiArrowLeft
            color="#ffffff"
            size={30}
            className=" border border-white px-0.5 py-1 mb-6"
          />
          <Text className=" text-white text-2xl">Create new WorkSpace</Text>
          <br />
          <Box className=" mt-9">
            <Text weight={"light"} className=" text-white text-xl ">
              Space name
            </Text>
            <TextField.Root
              placeholder=" Space Name"
              className=" max-w-lg mt-2"
            />
          </Box>
          <Box className=" mt-9">
            <Text weight={"light"} className=" text-white text-xl ">
              Description
            </Text>
            <TextArea
              placeholder=" tell some facts about this workspace..."
              className=" max-w-lg mt-2"
            />
          </Box>

          <Button color="brown" mt={"6"}>
            <FiPlus color="#ffffff" />
            Create Space
          </Button>
        </Box>
        <Box className=" w-full h-full ">
          <Flex className=" h-full max-h-screen">
            <img
              src="https://images.pexels.com/photos/4348082/pexels-photo-4348082.jpeg?auto=compress&cs=tinysrgb&w=600"
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "100%",
                backgroundColor: "var(--gray-5)",
              }}
            />
          </Flex>
        </Box>
      </Grid>
    </Flex>
  );
};

export default page;
