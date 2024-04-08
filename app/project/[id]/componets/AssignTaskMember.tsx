"use client";
import { Avatar, Box, Flex, Select, Tooltip, Text } from "@radix-ui/themes";
import axios from "axios";
import { Tasks } from "prisma/prisma-client";
import React, { useEffect, useState } from "react";

const AssignTaskMember = ({
  id,
  AssignedColId,
  AssignedColsrc,
  isChange,
  task,
  updateSelect,
}: {
  id: string;
  AssignedColId: string;
  AssignedColsrc: string;
  task: any;
  isChange: any;
  updateSelect: any;
}) => {
  const [_src, _setSrc] = useState<string>("");
  const [_Collabrators, _setCollabs] = useState<any>();
  const [DefaultColab, setDefaultCal] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get("/api/collab", {
        params: {
          project: id,
        },
      })
      .then((value) => {
        if (value.status == 200) {
          _setCollabs(value.data.data);
          setDefaultCal(AssignedColId);
          _setSrc(AssignedColsrc);
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (_Collabrators) {
      _Collabrators.map((e: any) => {});
    }
  }, [_Collabrators]);

  return (
    <>
      {_Collabrators && (
        <Select.Root
          defaultValue={DefaultColab ? DefaultColab : "none"}
          onValueChange={(e) => {
            const Coll = _Collabrators.find((impl: any) => {
              if (impl.id == e) return impl;
            });

            _setSrc(Coll ? Coll.userID.image : "");
            const Ut: Tasks = {
              id: task.id,
              taskname: task.taskname,
              status: task.status,
              prority: task.prority,
              projectId: id,
              duedate: task.duedate,
              description: task.description,
              assigned_By: task.assigned_By,
              assigned_To: Coll.id,
            };
            task.assigned_To = Coll.id;
            console.log("ASSIN : " + JSON.stringify(Ut));
            updateSelect(Ut);
            isChange(true);
          }}
        >
          <Select.Trigger
            variant="soft"
            className=" hover:bg-[#292A2C] bg-[#292A2C] hover:border border-orange-300 hover:cursor-pointer"
            onClick={() => {}}
            onMouseOver={(e) => {
              // e.currentTarget.style.backgroundColor = "#292A2C";
            }}
            onMouseOut={(e) => {
              // e.currentTarget.style.backgroundColor = "#1E1F21";
            }}
            style={{
              background: "#1E1F21",
              width: "100%",
              height: "100%",
            }}
          >
            <Tooltip content="Assign Task">
              <Avatar
                color="brown"
                radius="full"
                size={"2"}
                src={_src}
                variant="solid"
                fallback={
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </>
                }
              />
            </Tooltip>
          </Select.Trigger>
          <Select.Content color="violet" highContrast={false}>
            <Select.Group>
              <Select.Label>Collabrators</Select.Label>
              <Select.Separator />
              {_Collabrators.map((i: any, index: number) => {
                return (
                  <Select.Item key={index} value={i.id} className=" m-2">
                    <Flex gap={"3"} align={"center"}>
                      <Avatar size={"2"} src={i.userID.image} fallback />
                      <Text>{i.userID.name}</Text>
                    </Flex>
                  </Select.Item>
                );
              })}
              <Select.Item value={"none"} className=" m-2">
                <Flex gap={"3"} align={"center"}>
                  <Avatar
                    size={"2"}
                    src=""
                    color="brown"
                    fallback={
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </>
                    }
                  />
                  <Text>No Assignee</Text>
                </Flex>
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
    </>
  );
};

export default AssignTaskMember;
