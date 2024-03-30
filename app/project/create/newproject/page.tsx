import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { randomInt } from "crypto";
import Link from "next/link";
import React from "react";
import { FiArrowLeft, FiPlus } from "react-icons/fi";

const BlankProjectpage = () => {
  const PicArry = [
    "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
    "https://fastly.picsum.photos/id/194/2000/1325.jpg?hmac=fZjOIhEZbokJJSAVltL4uWaBmdFJYsS5nMgjrlLFtt8",
    "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
    "https://fastly.picsum.photos/id/89/4608/2592.jpg?hmac=G9E4z5RMJgMUjgTzeR4CFlORjvogsGtqFQozIRqugBk",
  ];

  const rand = randomInt(4);
  console.log("object", rand);

  return (
    <Flex
      className=" h-full w-full overflow-hidden bg-[#292A2C]"
      direction={"column"}
      justify={"center"}
      align={"center"}
    >
      <Grid className=" h-full w-full max-h-full max-w-full" columns={"2"}>
        <Box p={"6"}>
          <Link href={"/project/create"}>
            <FiArrowLeft
              color="#ffffff"
              size={30}
              className=" border border-white px-0.5 py-1 mb-6"
            />
          </Link>
          <Text className=" text-white text-2xl">Create new project</Text>
          <br />
          <Box className=" mt-9">
            <Text weight={"light"} className=" text-white text-xl ">
              Project name
            </Text>
            <TextField.Root
              placeholder=" Project name"
              className=" max-w-lg mt-2"
            />
          </Box>
          <Box className=" mt-9">
            <Text weight={"light"} className=" text-white text-xl ">
              Description
            </Text>
            <TextArea
              placeholder=" tell some facts about this project..."
              className=" max-w-lg mt-2"
            />
          </Box>
          <br />
          <Box>
            <Flex gapX={"3"}>
              <Text weight={"light"} className=" text-white text-xl ">
                WorkSpace Belong to
              </Text>

              <Select.Root defaultValue="1">
                <Select.Trigger className="  font-semibold" />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Available WorkSpaces</Select.Label>
                    <Select.Item value="1" className=" font-semibold">
                      Personal Space
                    </Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Box>

          <Button color="brown" mt={"6"}>
            <FiPlus color="#ffffff" />
            Create Project
          </Button>
        </Box>
        <Flex className=" w-full h-full ">
          <img src={PicArry[rand]} />
        </Flex>
      </Grid>
    </Flex>
  );
};

export default BlankProjectpage;
