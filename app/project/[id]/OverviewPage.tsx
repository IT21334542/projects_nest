"use client";
import InviteCollegue from "@/app/space/[id]/tabcontents/componets/InviteCollegue";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Skeleton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { FiEdit, FiSave, FiInfo } from "react-icons/fi";
import InviteTeamCollabrators from "./componets/InviteTeamCollabrators";
import MemberCard from "./componets/MemberCard";
import NewCollabForm from "./componets/NewCollabForm";
import axios from "axios";
import { json } from "stream/consumers";

export const OverviewPage = ({ prj, desc }: { prj: string; desc: string }) => {
  const [isEdited, _setEditstatus] = useState<boolean>(false);
  const [isInviting, _setInvitings] = useState<boolean>(false);
  const [_Colle, _setCollege] = useState<any | null>();
  const [SHANGE, _SHANGE] = useState<string | null>(desc);
  const [Members, _SetMemners] = useState<any>();
  const [changeMade, setChangeMade] = useState<string | null>(null);

  useEffect(() => {
    _SHANGE(desc);
  }, [desc]);

  //Updating description
  useEffect(() => {
    if (changeMade) {
      axios
        .patch(
          "/api/projects/Pid",
          {
            desc: changeMade,
          },
          {
            params: {
              project: prj,
            },
          }
        )
        .then((v) => {
          if (v.status == 200) {
            setChangeMade(null);
          }
        })
        .catch((e) => {
          console.error("error front :\t" + e);
        });
    }
  }, [changeMade]);

  //geting colab details
  useEffect(() => {
    axios
      .get("/api/collab", {
        params: {
          project: prj,
        },
      })
      .then((value) => {
        if (value.status == 200) {
          _SetMemners(value.data.data);
        }
      })
      .catch((err) => {
        console.error("Front errov OverPrj L" + err);
      });
  }, [prj]);

  return (
    <Grid justify={"center"}>
      <Flex direction={"column"}>
        <Box>
          <TextArea
            disabled={!isEdited}
            defaultValue={SHANGE ? SHANGE : "..."}
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
                  setChangeMade(SHANGE);
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
                Collabrators of the Project
              </Text>
              <Flex align={"center"} gap={"1"} ml={"1"}>
                <FiInfo color=" #ffffff" size={"0.8em"} />
                <Text weight={"light"} className=" text-white text-sm">
                  List of the members of this project is shown heres
                </Text>
              </Flex>
            </Flex>
            <NewCollabForm prjId={prj} />
          </Flex>
        </Box>
        {!Members && (
          <Grid columns={"3"} mt={"3"} gap={"3"}>
            <Card className=" w-1/2 ">
              <Box height={"80px"}>
                <Skeleton loading={true} />
              </Box>
            </Card>
            <Card className=" w-1/2 ">
              <Box height={"80px"}>
                <Skeleton loading={true} />
              </Box>
            </Card>
          </Grid>
        )}
        {Members && (
          <Grid columns={"3"} mt={"3"} gap={"3"}>
            {Members.map((colle: any, index: number) => {
              return (
                <MemberCard
                  key={index}
                  id={colle.id}
                  name={colle.userID.name}
                  pic={colle.userID.image}
                  role={colle.roleid ? colle.roleid.name : "Member"}
                />
              );
            })}
          </Grid>
        )}
      </Flex>
    </Grid>
  );
};
