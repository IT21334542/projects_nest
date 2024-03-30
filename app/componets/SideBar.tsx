"use client";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import React, { ReactNode, useEffect, useState } from "react";
import {
  FiBell,
  FiBookmark,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiPlus,
  FiPlusSquare,
} from "react-icons/fi";
interface Tiles {
  title: String;
  icons: ReactNode;
}

const BarTiles: Tiles[] = [
  {
    title: "Home",
    icons: <FiHome color="#ffffff" />,
  },
  {
    title: "MyTaks",
    icons: <FiBookmark color="#ffffff" />,
  },
  {
    title: "Inbox",
    icons: <FiBell color="#ffffff" />,
  },
];

const BarItems = ({ title, icons }: Tiles) => {
  return (
    <Box className=" w-full bg-[#292A2C] border border-white border-opacity-10 hover:bg-gray-600 py-1 px-2 rounded-md min-h-fit">
      <Flex justify={"start"} align={"center"} gapX={"1"}>
        {icons}
        <Text weight={"light"} className="text-white">
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

const BarTitles = ({ title }: { title: String }) => {
  const [_Hover, _setHover] = useState<boolean>(false);
  const [_Click, _setClick] = useState<boolean>(true);
  const Result: Tiles[] = [
    {
      title: "Home",
      icons: <FiHome color="#ffffff" />,
    },
    {
      title: "MyTaks",
      icons: <FiBookmark color="#ffffff" />,
    },
    {
      title: "Inbox",
      icons: <FiBell color="#ffffff" />,
    },
  ];
  return (
    <Box className=" w-full  border-t-2 border-white border-opacity-25 mt-3">
      <Flex
        justify={"between"}
        align={"center"}
        mt={"1"}
        onMouseEnter={() => {
          _setHover(true);
        }}
        onMouseLeave={() => {
          _setHover(false);
        }}
      >
        <Text className=" text-white font-semibold">{title}</Text>
        <Flex>
          <FiPlusSquare color="#ffffff" />
          {_Hover && !_Click && (
            <FiChevronLeft
              color="#ffffff"
              onClick={() => {
                _setClick(true);
              }}
            />
          )}
          {_Click && (
            <FiChevronDown
              color="#ffffff"
              onClick={() => {
                _setClick(false);
              }}
            />
          )}
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={"1"} mt={"2"}>
        {_Click &&
          Result.map((result, index) => {
            return (
              <BarItems key={index} title={result.title} icons={result.icons} />
            );
          })}
      </Flex>
    </Box>
  );
};

const SideBar = ({ indicator }: { indicator: any }) => {
  const [_ShowBar, _setShowBar] = useState<boolean>(true);
  useEffect(() => {
    _setShowBar(indicator);
  }, [indicator]);
  if (_ShowBar)
    return (
      <Flex
        className=" h-full w-2/12 bg-[#292A2C]"
        direction={"column"}
        align={"center"}
        px={"5"}
        py={"5"}
        gap={"1"}
      >
        {BarTiles.map((tiles, index) => {
          return (
            <BarItems key={index} title={tiles.title} icons={tiles.icons} />
          );
        })}
        <br />
        <Box className=" w-full h-3/5  overflow-x-hidden overflow-y-scroll">
          <BarTitles title={"Spaces"} />
          <BarTitles title={"Projects"} />
        </Box>
      </Flex>
    );
};

export default SideBar;
