"use client";
import { SPACE } from "@/app/componets/Interface_all";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Grid,
  Link,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiLayout, FiPlus } from "react-icons/fi";

// interface Projects {}

// interface Space {
//   name: string;
//   id: string;
//   description: string;
//   createdby: string;
// }

const ProjectsPageComponent = ({ spaceid }: { spaceid: String }) => {
  const [_Space, _setSpace] = useState<any | null>(null);
  const [ProjectSelected, setProjectSelected] = useState<string | null>(null);
  const [_spaceid, _setSpaceid] = useState<String | null>(null);

  useEffect(() => {
    if (!_spaceid) {
      _setSpaceid(spaceid);
    }
  }, [spaceid]);

  useEffect(() => {
    if (_spaceid) {
      console.log("Lloading fetch spaces of space " + _spaceid);
      axios
        .get("/api/space/" + _spaceid)
        .then((value) => {
          console.log("value project  to _Space");
          _setSpace(value.data.data);
          console.log(value.data.data);
        })
        .catch((err) => {
          console.log("FRont error :" + err);
        });
    }
  }, [_spaceid]);

  return (
    <Grid justify={"center"}>
      <Flex justify={"end"}>
        <Link href={"/project/create"}>
          <Button color="brown">
            <FiPlus color="#ffffff" />
            <Text className=" text-white">Create Project</Text>
          </Button>
        </Link>
      </Flex>
      {_Space && (
        <Table.Root m={"4"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className=" text-white">
                Name
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className=" text-white">
                Owner
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className=" text-white">
                Members
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className=" text-white">
                DueDate
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className=" text-white">
                Status
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_Space.Project.length == 0 && (
              <Flex className=" w-full h-full justify-center items-center flex-col">
                <FiLayout color="#ffffff" size={"5em"} />
                <Text className=" text-white" size={"4"}>
                  no Projects available , create new project
                </Text>
              </Flex>
            )}
            {_Space.Project.map((Project: any, index: number) => {
              return (
                <Table.Row key={index}>
                  <Table.RowHeaderCell className=" text-white">
                    <Flex align={"end"} gap={"2"} className=" cursor-pointer ">
                      <FiLayout color="#ffffff" size={"2em"} />
                      <Link href={"/project/" + Project.id} underline="hover">
                        <Text className=" text-white hover:underline">
                          {Project.name}
                        </Text>
                      </Link>
                    </Flex>
                  </Table.RowHeaderCell>
                  <Table.Cell className=" text-white">
                    <Flex gap={"2"} align={"center"}>
                      <Avatar
                        size={"2"}
                        color="brown"
                        src={Project.Ownerid.image}
                        fallback="?"
                        radius="full"
                      />
                      {Project.Ownerid.name}
                    </Flex>
                  </Table.Cell>
                  <Table.Cell className=" text-white">
                    <Flex gap={"1"}>
                      {Project.Collabrators.map((Colbs: any, inde: number) => {
                        return (
                          <Tooltip content={Colbs.userID.name} key={inde}>
                            <Avatar
                              size={"2"}
                              radius="full"
                              key={inde}
                              src={Colbs.userID.image}
                              fallback="?"
                            />
                          </Tooltip>
                        );
                      })}
                    </Flex>
                  </Table.Cell>
                  <Table.Cell className=" text-white">
                    {Project.dueDate ? (
                      Project.dueDate
                    ) : (
                      <FiCalendar
                        color="#ffffff"
                        size={"2em"}
                        width={"100%"}
                        height={"100%"}
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell className=" text-white">
                    <Badge color="violet" variant="solid">
                      {Project.status}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      )}
    </Grid>
  );
};

export default ProjectsPageComponent;
