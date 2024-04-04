import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FiCoffee } from "react-icons/fi";

const InviteTeamCollabrators = () => {
  return (
    <Button color="violet">
      <FiCoffee size={"1.2em"} />
      <Text>Invite Collabartos</Text>
    </Button>
  );
};

export default InviteTeamCollabrators;
