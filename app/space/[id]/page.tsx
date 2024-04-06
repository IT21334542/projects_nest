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
import ProjectsPageComponent from "./tabcontents/projects";
import axios from "axios";
import SelectSpace from "./componets/SelectSpace";
import FilesCompSpace from "./tabcontents/Files";

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
              <SelectSpace id={id} />
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
                <Tabs.Trigger value="Projects">
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

              <Tabs.Content value="Projects">
                <ProjectsPageComponent spaceid={id} />
              </Tabs.Content>
              <Tabs.Content value="Resources">
                <FilesCompSpace id={id} />
              </Tabs.Content>
            </Flex>
          </Tabs.Root>
        </Flex>
        {_Project && <ProjectSideComponent />}
      </Grid>
    </Flex>
  );
};

export default SingleSpacePage;
