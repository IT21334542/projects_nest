import {
  Avatar,
  Box,
  Flex,
  Grid,
  Table,
  Text,
  TextArea,
  Tooltip,
} from "@radix-ui/themes";
import React from "react";
import { FiArrowLeftCircle, FiArrowRight, FiCheck } from "react-icons/fi";

const Tasks = (props: { taskopen: any }) => {
  const { taskopen } = props;
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
            onClick={() => {
              taskopen(null);
            }}
          />
        </Flex>
      </Flex>
      {/* table rows */}
      <Flex className=" w-1/2" align={"center"}>
        <Table.Root>
          <Table.Header></Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell className=" text-white">
                Assigned to
              </Table.RowHeaderCell>
              <Table.Cell className=" text-white">
                <Avatar
                  src="https://plus.unsplash.com/premium_photo-1709999650590-deeb1b76d2a4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  fallback="a"
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell className=" text-white">
                Due Date
              </Table.RowHeaderCell>
              <Table.Cell className=" text-white">Assigned to</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell className=" text-white">
                Files
              </Table.RowHeaderCell>
              <Table.Cell className=" text-white">Assigned to</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Flex>
      <Flex direction={"column"}>
        <Text className=" text-white" weight={"light"}>
          Decription
        </Text>
        <Box maxHeight="300px" maxWidth={"100%"} height={"50%"}>
          <TextArea
            placeholder=" description"
            size={"2"}
            style={{
              height: "1px",
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Tasks;
