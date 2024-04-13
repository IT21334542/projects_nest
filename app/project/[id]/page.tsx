"use client";
import {
  Avatar,
  Box,
  Button,
  Callout,
  Container,
  DropdownMenu,
  Flex,
  Grid,
  Strong,
  Tabs,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import {
  FiArrowDownCircle,
  FiBox,
  FiChevronDown,
  FiClipboard,
  FiInfo,
  FiLayout,
  FiMail,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";
import Tasks from "./Tasks";
import { OverviewPage } from "./OverviewPage";
import { TasksPage } from "./TasksPage.2";
import axios from "axios";
import MessagenoIcon from "./componets/MessagenoIcon";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

const MessagesPage = () => {
  return (
    <Grid>
      <Flex
        className=" w-full h-full"
        justify={"center"}
        align={"start"}
        pt={"8"}
      >
        <Flex
          className=" h-1/2 w-1/2"
          align={"center"}
          justify={"start"}
          direction={"column"}
        >
          <MessagenoIcon />
          <Text className=" text-white">No Messages</Text>
        </Flex>
      </Flex>
    </Grid>
  );
};

const FilesPage = ({ project }: { project: any }) => {
  const Router = useRouter();

  return (
    <Grid>
      <Flex className=" h-full w-full" direction={"column"} align={"center"}>
        <Image
          alt=""
          src="/nofiles.png"
          className=" object-contain aspect-auto w-1/3"
        />
        <Flex
          className=" w-full"
          gap={"5"}
          justify={"center"}
          mt={"5"}
          direction={"column"}
          maxWidth={"20%"}
        >
          <Button
            color="brown"
            onClick={() => {
              Router.push("/space/" + project.spaceid.id);
            }}
          >
            {" "}
            Upload a file to Space
          </Button>
          <Callout.Root>
            <Callout.Icon>
              <FiInfo color="#ffffff" />
            </Callout.Icon>
            <Callout.Text className=" text-white">
              to add a file to <Strong>Task</Strong> select the task in project
              tab
            </Callout.Text>
          </Callout.Root>
        </Flex>
      </Flex>
    </Grid>
  );
};

const ProjectPage = ({ params: { id } }: { params: { id: String } }) => {
  const [_Task, _setTask] = useState<String | null>(null);
  const [_project, _setProject] = useState<any>();
  const [isDesciEdited, _setisDesciEdited] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/api/projects/" + id)
      .then((vvalue) => {
        if (vvalue.status == 200) {
          console.log("object");
          _setProject(vvalue.data.data);
          _setisDesciEdited(false);
        }
      })
      .catch((err) => {
        console.error("Errr proj p " + err);
        _setisDesciEdited(false);
      });
  }, [id, isDesciEdited]);

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
              <Text weight={"medium"} className=" text-white">
                {_project ? _project.name : ""}
              </Text>
              {/* <DropMenu title={_project ? _project.name : ""} /> */}
            </Flex>
          </Flex>

          {/* Tabs */}

          <Tabs.Root className=" max-h-full w-full  " defaultValue="overview">
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
                {_project && (
                  <OverviewPage
                    prj={id.toString()}
                    desc={_project ? _project.description : " loading"}
                    isDesci={_setisDesciEdited}
                  />
                )}
              </Tabs.Content>
              <Tabs.Content value="Tasks">
                <TasksPage setFun={_setTask} Id={id.toString()} />
              </Tabs.Content>
              <Tabs.Content value="Messages">
                <MessagesPage />
              </Tabs.Content>
              <Tabs.Content value="Resources">
                <FilesPage project={_project} />
              </Tabs.Content>
            </Flex>
          </Tabs.Root>
        </Flex>
        {_Task && <Tasks taskopen={_setTask} task={_Task} />}
      </Grid>
    </Flex>
  );
};

export default ProjectPage;
