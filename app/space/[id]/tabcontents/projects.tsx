"use client";
import { SPACE } from "@/app/componets/Interface_all";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Grid,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLayout, FiPlus } from "react-icons/fi";

// interface Projects {}

// interface Space {
//   name: string;
//   id: string;
//   description: string;
//   createdby: string;
// }

const ProjectsPageComponent = ({ spaceid }: { spaceid: String }) => {
  const [_Space, _setSpace] = useState<any | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/space/" + spaceid)
      .then((value) => {
        _setSpace(value.data.data);
        console.log(value.data.data);
      })
      .catch((err) => {
        console.log("FRont error :" + err);
      });
  }, []);

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
            {_Space.Project.map((Project: any, index: number) => {
              return (
                <Table.Row key={index}>
                  <Table.RowHeaderCell className=" text-white">
                    <Flex align={"end"} gap={"2"}>
                      <FiLayout color="#ffffff" size={"2em"} />
                      {Project.name}
                    </Flex>
                  </Table.RowHeaderCell>
                  <Table.Cell className=" text-white">
                    {Project.Ownerid.name}
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
                      <Text className=" text-yellow-600">Not Defined</Text>
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
