"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Grid,
  Table,
  Tabs,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import React, { useState } from "react";
import {
  FiArrowDownCircle,
  FiBox,
  FiCheck,
  FiChevronDown,
  FiClipboard,
  FiLayout,
  FiMail,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";
import Tasks from "./Tasks";

const DropMenu = ({ title }: { title: String }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Flex align={"center"} mb={"2"} gap={"1"}>
          <Text weight={"medium"} className=" text-white">
            {title}
          </Text>
          <FiChevronDown
            color="#ffffff"
            className=" hover:bg-white hover:bg-opacity-20"
          />
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const OverviewPage = () => {
  return (
    <Grid>
      <Text className=" text-white">We overview</Text>
    </Grid>
  );
};

const TasksPage = (props: { setFun: any }) => {
  return (
    <Grid justify={"center"}>
      <Flex direction={"column"}>
        <Flex className=" border-b-2 border-white  border-opacity-50 mx-3  mb-6 pb-3">
          <Button color="brown">Add task</Button>
        </Flex>
        <Flex direction={"column"}>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text>TASK NAME</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text>ASSIGNEE</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text>DUE DATE</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text>STATUS</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text>PRORITY</Text>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row align="center">
                {/* TASK NAME */}
                <Table.RowHeaderCell className=" text-white" maxWidth={"100px"}>
                  <Flex align={"center"} gap={"2"}>
                    <FiCheck
                      color="#ffffff"
                      size={"1.5em"}
                      className=" border-2  p-0.5 border-dashed rounded-full border-white hover:border-green-300 hover:bg-gray-900 "
                      onClick={() => {
                        console.log("COMPLETED");
                      }}
                    />
                    <TextField.Root
                      placeholder=""
                      className=" w-96 max-w-xl"
                      onClick={() => {
                        console.log("NAME");
                      }}
                    ></TextField.Root>
                  </Flex>
                </Table.RowHeaderCell>

                {/* TASK ASSIGNEE */}
                <Table.Cell className=" text-white" align="justify">
                  <Avatar
                    size={"2"}
                    variant="solid"
                    src=""
                    fallback={
                      <Avatar
                        color="brown"
                        variant="solid"
                        src=""
                        fallback={
                          <Tooltip content="Add New Member">
                            <Box width="24px" height="24px">
                              <svg viewBox="0 0 64 64" fill="currentColor">
                                <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
                              </svg>
                            </Box>
                          </Tooltip>
                        }
                      />
                    }
                  />
                </Table.Cell>

                {/* DATE DUE */}
                <Table.Cell className=" text-white">
                  <Flex>Test</Flex>
                </Table.Cell>

                {/* TASK STATUS */}
                <Table.Cell className=" text-white">
                  <Flex>
                    <Badge variant="solid" color="violet">
                      OPEN
                    </Badge>
                  </Flex>
                </Table.Cell>

                {/* Task prorotiy */}
                <Table.Cell className=" text-white">
                  <Flex>
                    <Badge variant="solid" color="red">
                      HIGH
                    </Badge>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </Grid>
  );
};

const MessagesPage = () => {
  return (
    <Grid>
      <Text className=" text-white">We Messages</Text>
    </Grid>
  );
};

const FilesPage = () => {
  return (
    <Grid>
      <Text className=" text-white">We Files</Text>
    </Grid>
  );
};

const ProjectPage = ({ params: { id } }: { params: { id: String } }) => {
  const [_Task, _setTask] = useState<String | null>(null);
  return (
    <Flex
      className=" bg-[#1E1F21] w-full overflow-hidden h-full py-4 px-5"
      direction={"column"}
      gap={"2"}
    >
      <Grid columns={_Task ? "2" : "1"} className=" h-full">
        <Flex direction={"column"}>
          {/* Title bar */}
          <Flex
            className=" h-14 w-full mb-3 border-b-2 border-gray-500 border-opacity-40 items-center"
            justify={"between"}
          >
            <Flex gap={"1"} align={"end"} pb={"1"}>
              <FiLayout color="#d9f99d" size={"3em"} />
              <DropMenu title={"Name2"} />
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <Avatar
                src="https://plus.unsplash.com/premium_photo-1709999650590-deeb1b76d2a4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                fallback="A"
              />
              <Avatar
                variant="solid"
                color="brown"
                fallback={
                  <Tooltip content="Add New Member">
                    <Box width="24px" height="24px">
                      <svg viewBox="0 0 64 64" fill="currentColor">
                        <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
                      </svg>
                    </Box>
                  </Tooltip>
                }
              />

              <Button color="violet">
                <FiMail color="#ffffff" size={"1.3em"} />
                Invite to Space
              </Button>
            </Flex>
          </Flex>

          {/* Tabs */}

          <Tabs.Root className=" max-h-full w-full  ">
            {/* list of tabls*/}
            <Flex className="  w-full  mb-5  " direction={"column"}>
              <Tabs.List
                color="brown"
                justify={"center"}
                className="border-white border-opacity-25 border-b"
              >
                <Tabs.Trigger value="overview">
                  <Flex align={"center"} gap={"1"}>
                    <FiBox color="#ffffff" />
                    <Text className=" text-white">Overview</Text>
                  </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger value="Tasks">
                  <Flex align={"center"} gap={"1"}>
                    <FiClipboard color="#ffffff" />
                    <Text className=" text-white">Tasks</Text>
                  </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger value="Messages">
                  <Flex align={"center"} gap={"1"}>
                    <FiSend color="#ffffff" />
                    <Text className=" text-white">Messages</Text>
                  </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger value="Resources">
                  <Flex align={"center"} gap={"1"}>
                    <FiPaperclip color="#ffffff" />
                    <Text className=" text-white">Files</Text>
                  </Flex>
                </Tabs.Trigger>
              </Tabs.List>
            </Flex>

            {/* content pages */}
            <Flex
              direction={"column"}
              className="  overflow-scroll md:max-h-[500px]"
            >
              <Tabs.Content value="overview">
                <OverviewPage />
              </Tabs.Content>
              <Tabs.Content value="Tasks">
                <TasksPage setFun={_setTask} />
              </Tabs.Content>
              <Tabs.Content value="Messages">
                <MessagesPage />
              </Tabs.Content>
              <Tabs.Content value="Resources">
                <FilesPage />
              </Tabs.Content>
            </Flex>
          </Tabs.Root>
        </Flex>
        {_Task && <Tasks taskopen={_setTask} />}
      </Grid>
    </Flex>
  );
};

export default ProjectPage;
