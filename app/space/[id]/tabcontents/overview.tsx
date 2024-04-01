"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  TextArea,
  Text,
  Card,
  Avatar,
} from "@radix-ui/themes";
import axios from "axios";
import { colleague, InviteState } from "prisma/prisma-client";
import React, { useEffect, useState } from "react";
import { FiEdit, FiInfo, FiMail, FiSave } from "react-icons/fi";
import InviteCollegue from "./componets/InviteCollegue";

interface Colleg {
  id: String;
  email: string;
  invite: InviteState;
  roleid: String;
  spaceid: String;
  roleId: {
    id: String;
    name: string;
    spaceId: String;
  };
}

const ColleagueCard = ({
  title,
  picture,
  role,
}: {
  title: string;
  picture: string;
  role: string;
}) => {
  return (
    <Box maxWidth="240px">
      <Card>
        <Flex gap="3" align="center">
          <Avatar size="3" src={picture} radius="full" fallback="?" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {title}
            </Text>
            <Text as="div" size="2" color="gray">
              {role}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

const OverviewCompoent = ({ spaceid }: { spaceid: String }) => {
  const [isEdited, _setEditstatus] = useState<boolean>(false);
  const [isInviting, _setInvitings] = useState<boolean>(false);
  const [_Colle, _setCollege] = useState<Colleg[] | null>();

  useEffect(() => {
    axios
      .get("/api/colleague/" + spaceid)
      .then((value) => {
        _setCollege(value.data.data);
      })
      .catch((err) => {
        console.log("Log.d error front Overview" + err);
      });
  }, [isInviting]);

  return (
    <Grid justify={"center"}>
      <Flex direction={"column"}>
        <Box>
          <TextArea
            disabled={!isEdited}
            placeholder=" descrption"
            size={"3"}
            style={{
              maxWidth: "80%",
              maxHeight: "200px",
              height: "200px",
            }}
          />
          <Flex m={"4"} gap={"4"}>
            <Button
              color="violet"
              onClick={() => {
                _setEditstatus(true);
              }}
            >
              <FiEdit color=" #ffffff" />
              Edit
            </Button>
            {isEdited && (
              <Button
                color="red"
                onClick={() => {
                  _setEditstatus(false);
                }}
              >
                <FiSave color=" #ffffff" />
                Save
              </Button>
            )}
          </Flex>
        </Box>
        <Box className=" mt-2 border-t border-white border-opacity-35">
          <Flex justify={"between"} align={"center"}>
            <Flex direction={"column"}>
              <Text weight={"medium"} className=" text-white">
                Team For the Space
              </Text>
              <Flex align={"center"} gap={"1"} ml={"1"}>
                <FiInfo color=" #ffffff" size={"0.8em"} />
                <Text weight={"light"} className=" text-white text-sm">
                  Members of the team is shown inside the project collabrator
                  option and , assign tasks
                </Text>
              </Flex>
            </Flex>
            <InviteCollegue spaceid={spaceid} _setInvitings={_setInvitings} />
          </Flex>
        </Box>
        <Grid columns={"3"} mt={"3"} gap={"3"}>
          {_Colle?.map((c, index) => (
            <ColleagueCard
              key={index}
              title={c.email}
              picture={""}
              role={c.roleId.name}
            />
          ))}
        </Grid>
      </Flex>
    </Grid>
  );
};

export default OverviewCompoent;
