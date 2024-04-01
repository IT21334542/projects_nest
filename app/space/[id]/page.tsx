"use client";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Text,
  Flex,
  Grid,
  Tooltip,
  Tabs,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import {
  FiBox,
  FiChevronDown,
  FiClipboard,
  FiFolder,
  FiMail,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";
import ProjectSideComponent from "./project";
import OverviewCompoent from "./tabcontents/overview";
import axios from "axios";

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

interface Space {
  id: string;
  name: string;
  description: string;
  createdby: string;
}

const SingleSpacePage = ({ params: { id } }: { params: { id: String } }) => {
  const [_Project, _setProject] = useState<String | null>(null);
  const [_Space, _setSpace] = useState<Space | null>(null);
  const [isChangeMade, _setChangeMade] = useState<string | null>();

  useEffect(() => {
    axios
      .get("/api/space/" + id)
      .then((value) => {
        _setSpace(value.data.data);
      })
      .catch((err) => {
        console.log("ERROR Front" + err);
      });
  }, []);

  useEffect(() => {
    const Sp = {
      id: _Space?.id,
      name: _Space?.name,
      description: isChangeMade,
      createdby: _Space?.createdby,
    };

    axios
      .put("/api/space/" + id, Sp)
      .then((value) => {})
      .catch((err) => {
        console.log("ERROR Front" + err);
      });
  }, [isChangeMade]);

  return (
    <Flex
      className=" bg-[#1E1F21] w-full overflow-hidden h-full py-4 px-5"
      direction={"column"}
      gap={"2"}
    >
      <Grid columns={_Project ? "2" : "1"} className=" h-full">
        <Flex direction={"column"}>
          {/* Title bar */}
          <Flex
            className=" h-14 w-full mb-3 border-b-2 border-gray-500 border-opacity-40 items-center"
            justify={"between"}
          >
            <Flex gap={"1"} align={"end"} pb={"1"}>
              <FiFolder color="#d9f99d" size={"3em"} />
              <DropMenu title={_Space?.name!} />
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
          <Tabs.Root className=" max-h-full w-full  " defaultValue="overview">
            {/* list of tabls*/}
            <Flex className="  w-full  mb-5  " direction={"column"}>
              <Tabs.List
                color="brown"
                justify={"start"}
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
                    <Text className=" text-white">Projects</Text>
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
                {_Space && (
                  <OverviewCompoent
                    spaceid={id}
                    _SpaceDiscription={_Space ? _Space.description : "Loading"}
                    _setChangeMade={_setChangeMade}
                  />
                )}
              </Tabs.Content>

              <Tabs.Content value="Tasks"></Tabs.Content>
              <Tabs.Content value="Resources"></Tabs.Content>
            </Flex>
          </Tabs.Root>
        </Flex>
        {_Project && <ProjectSideComponent />}
      </Grid>
    </Flex>
  );
};

export default SingleSpacePage;
