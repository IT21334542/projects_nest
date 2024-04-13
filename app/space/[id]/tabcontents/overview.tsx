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
  userID: {
    id: String;
    name: string;
    email: String;
    image: string;
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
          <Avatar
            size="3"
            src={picture.toString()}
            radius="full"
            fallback={
              <Avatar
                src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                fallback
              />
            }
          />
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
interface Space {
  id: String;
  name: String;
  description: String;
  createdby: String;
}

const OverviewCompoent = ({
  spaceid,
  _SpaceDiscription,
  _setChangeMade,
}: {
  spaceid: String;
  _SpaceDiscription: string;
  _setChangeMade: any;
}) => {
  const [isEdited, _setEditstatus] = useState<boolean>(false);
  const [isInviting, _setInvitings] = useState<boolean>(false);
  const [_Colle, _setCollege] = useState<Colleg[] | null>();
  const [SHANGE, _SHANGE] = useState<string | null>(null);
  const [LoadingBtn, _setLoadingBtn] = useState<boolean>(false);

  useEffect(() => {
    _setLoadingBtn(true);
    axios
      .get("/api/colleague/" + spaceid)
      .then((value) => {
        _setCollege(value.data.data);
        _setInvitings(false);
        _setLoadingBtn(false);
      })
      .catch((err) => {
        console.log("Log.d error front Overview" + err);
        _setInvitings(false);
        _setLoadingBtn(false);
      });
  }, [isInviting]);

  return (
    <Grid justify={"center"}>
      <Flex direction={"column"}>
        <Box>
          <TextArea
            disabled={!isEdited}
            defaultValue={_SpaceDiscription}
            onChange={(e) => {
              _SHANGE(e.currentTarget.value);
            }}
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
                  _setChangeMade(SHANGE);
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
            <InviteCollegue
              spaceid={spaceid}
              _setInvitings={_setInvitings}
              loadingS={LoadingBtn}
            />
          </Flex>
        </Box>
        <Grid columns={"3"} mt={"3"} gap={"3"}>
          {_Colle?.map((c, index) => (
            <ColleagueCard
              key={index}
              title={c.userID ? c.userID.name : c.email}
              picture={
                c.userID
                  ? c.userID.image
                  : "https://img.icons8.com/?size=256&id=mtfWz20b5AxB&format=png"
              }
              role={c.roleId.name}
            />
          ))}
        </Grid>
      </Flex>
    </Grid>
  );
};

export default OverviewCompoent;
