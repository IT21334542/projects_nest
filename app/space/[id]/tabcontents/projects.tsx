"use client";
import { Button, Flex, Grid, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FiLayout, FiPlus } from "react-icons/fi";

const ProjectsPageComponent = ({ spaceid }: { spaceid: String }) => {
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
          <Table.Row>
            <Table.RowHeaderCell className=" text-white">
              <Flex align={"end"} gap={"2"}>
                <FiLayout color="#ffffff" size={"2em"} />
                Name
              </Flex>
            </Table.RowHeaderCell>
            <Table.Cell className=" text-white">{spaceid}</Table.Cell>
            <Table.Cell className=" text-white">Me</Table.Cell>
            <Table.Cell className=" text-white">Due</Table.Cell>
            <Table.Cell className=" text-white">Status</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Grid>
  );
};

export default ProjectsPageComponent;
