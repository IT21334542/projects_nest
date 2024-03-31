import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  HoverCard,
  Text,
  TextField,
} from "@radix-ui/themes";
import { FiMenu, FiPlus, FiSearch } from "react-icons/fi";
import Icons from "./Icons";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBar = (props: { indicater: any; setter: any }) => {
  const { indicater, setter } = props;
  const { data } = useSession();

  return (
    <nav>
      <Flex
        className="bg-[#2E2E30] text-white w-full h-14  mr-3 px-5 border-b-2 border-gray-200 border-opacity-20"
        align={"center"}
        justify={"between"}
        gap={"3"}
      >
        <Flex gap={"3"}>
          <Icons>
            <FiMenu
              size={25}
              onClick={() => {
                console.log("indicator is " + indicater);
                setter(!indicater);
              }}
            />
          </Icons>

          <Button variant="solid" color="brown">
            <Flex justify={"center"} align={"center"} gapX={"2"}>
              <FiPlus color="#ffffff" size={15} />
              <Text className=" text-white font-sans  ">Create</Text>
            </Flex>
          </Button>
        </Flex>

        <Box className=" bg-gray-600 w-1/2 rounded-md text-white">
          <TextField.Root color="brown" placeholder="Search..." variant="soft">
            <TextField.Slot>
              <FiSearch color="#ffffff" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Flex className=" bg-orange-300 rounded-md ">
              <Avatar src={data?.user.image!} fallback="?" />
            </Flex>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="center">
            <DropdownMenu.Label>
              <Flex>
                <Text weight={"medium"} size={"2"}>
                  {data?.user.name!}
                </Text>
              </Flex>
            </DropdownMenu.Label>
            <DropdownMenu.Label>
              <Flex>
                <Text weight={"medium"} size={"2"}>
                  {data?.user.email}
                </Text>
              </Flex>
            </DropdownMenu.Label>
            <DropdownMenu.Item color="red">
              <Link href={"/api/auth/signout"}>Sign Out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </nav>
  );
};

export default NavBar;
