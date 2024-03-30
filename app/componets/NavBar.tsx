import {
  Avatar,
  Box,
  Button,
  Flex,
  HoverCard,
  Text,
  TextField,
} from "@radix-ui/themes";
import { FiMenu, FiPlus, FiSearch } from "react-icons/fi";
import Icons from "./Icons";

const NavBar = (props: { indicater: any; setter: any }) => {
  const { indicater, setter } = props;
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

        <HoverCard.Root>
          <HoverCard.Trigger>
            <Flex className=" bg-orange-300 rounded-md ">
              <Avatar src="" fallback />
            </Flex>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Box className=" w-32 h-fit">
              <Text>Hello</Text>
            </Box>
          </HoverCard.Content>
        </HoverCard.Root>
      </Flex>
    </nav>
  );
};

export default NavBar;
