"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Popover,
  Select,
  Table,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import AssignTaskMember from "./componets/AssignTaskMember";
import Calendar from "react-calendar";

const ProrityCompoent = () => {
  return (
    <Select.Root defaultValue="Low">
      <Select.Trigger variant="ghost" color="violet" />
      <Select.Content
        color="violet"
        highContrast={false}
        style={{
          background: "#292A2C",
          color: "Background",
        }}
      >
        <Select.Item value="Low">
          <Badge size={"2"} variant="solid" color="green">
            Low
          </Badge>
        </Select.Item>
        <Select.Item value="close">
          <Badge size={"2"} variant="solid" color="yellow">
            Medium
          </Badge>
        </Select.Item>
        <Select.Item value="onprocess">
          <Badge size={"2"} variant="solid" color="red">
            High
          </Badge>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const StatusComponent = () => {
  return (
    <Select.Root defaultValue="open">
      <Select.Trigger variant="ghost" />
      <Select.Content
        highContrast={false}
        style={{
          background: "#292A2C",
          color: "Background",
        }}
        color="violet"
      >
        <Select.Item value="open">
          <Badge size={"2"} variant="solid" color="grass">
            OPEN
          </Badge>
        </Select.Item>
        <Select.Item value="close">
          <Badge size={"2"} variant="solid" color="cyan">
            Close
          </Badge>
        </Select.Item>
        <Select.Item value="onprocess">
          <Badge size={"2"} variant="solid" color="plum">
            On progress
          </Badge>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const DueDateCompoent = () => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Flex>
          {!date && (
            <Tooltip content="Add a due date">
              <Box className=" hover:border-2 border-white border-opacity-45 p-0.5 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </Box>
            </Tooltip>
          )}
          {date && (
            <Badge
              color="violet"
              variant="outline"
              className=" bg-[#292A2C]"
              style={{
                border: "2px solid white",
              }}
            >
              <Text size={"2"} className=" text-white">
                {date?.getDate() +
                  "/" +
                  (date!.getMonth() + 1) +
                  "/" +
                  date?.getFullYear()}
              </Text>
            </Badge>
          )}
        </Flex>
      </Popover.Trigger>
      <Popover.Content
        style={{
          background: "#292A2C",
          color: "#ffffff",
          width: "300px",
        }}
      >
        <Calendar
          onClickDay={(date) => {
            setDate(date);
          }}
          className={""}
        />
        <Flex justify={"between"} mt={"3"}>
          <Popover.Close>
            <Button color="brown">Close</Button>
          </Popover.Close>
          <Popover.Close>
            <Button
              color="bronze"
              onClick={() => {
                setDate(null);
              }}
            >
              Do not assign Due
            </Button>
          </Popover.Close>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export const TasksPage = (props: { setFun: any; Id: string }) => {
  const [_isElement, _setIsElement] = useState<boolean>(false);
  const [_NameChanged, _SetNameChange] = useState<String>("");
  const [_ASSIGNEECHANGED, _SetASSIGNEECHANGE] = useState<String>("");

  return (
    <Grid justify={"center"}>
      <Flex direction={"column"}>
        <Flex className=" border-b-2 border-white  border-opacity-50 mx-3  mb-6 ">
          <Button color="brown">Add task</Button>
        </Flex>
        <Flex direction={"column"}>
          <Table.Root>
            <Table.Header>
              <Table.Row className=" border-t border-b  border-white border-opacity-45">
                <Table.ColumnHeaderCell className=" text-white ">
                  <Text weight={"light"}>Task name</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text weight={"light"}>Assignee</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text weight={"light"}>Due date</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text weight={"light"}>Status</Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className=" text-white">
                  <Text weight={"light"}>Prority</Text>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row
                onClick={() => {}}
                align="center"
                className="  rounded-full hover:bg-[#292A2C] cursor-pointer mt-2"
              >
                {/* TASK NAME */}
                <Table.RowHeaderCell
                  className=" text-white hover:border "
                  onClick={() => {
                    if (!_isElement) {
                      props.setFun(true);
                    }
                  }}
                >
                  <Flex align={"center"} gap={"2"}>
                    <Tooltip
                      content="Mark As Complete"
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#ffffff",
                      }}
                      className=" text-white"
                    >
                      <FiCheckCircle
                        color="#ffffff"
                        size={"2em"}
                        onMouseEnter={() => {
                          _setIsElement(true);
                        }}
                        onMouseLeave={() => {
                          _setIsElement(false);
                        }}
                        className=" border-2 px-0.5  rounded-md border-white border-opacity-0 hover:border-opacity-45 "
                        onClick={() => {
                          console.log("COMPLETED");
                        }}
                      />
                    </Tooltip>
                    <TextField.Root
                      variant="soft"
                      color="violet"
                      className=" hover:border border-white border-opacity-20 "
                      style={{
                        color: "#ffffff",
                        background: " #292A2C",
                        width: "350px",
                      }}
                      placeholder=""
                      onMouseEnter={() => {
                        _setIsElement(true);
                      }}
                      onMouseLeave={() => {
                        _setIsElement(false);
                      }}
                      onChange={(e) => {
                        _SetNameChange(e.currentTarget.value);
                      }}
                    ></TextField.Root>
                  </Flex>
                </Table.RowHeaderCell>

                {/* TASK ASSIGNEE */}
                <Table.Cell
                  p={"2"}
                  className=" text-white hover:border border-white col-span-1"
                >
                  <AssignTaskMember
                    id={props.Id}
                    _SetASSIGNEECHANGE={_SetASSIGNEECHANGE}
                  />
                </Table.Cell>

                {/* DATE DUE */}
                <Table.Cell className=" text-white hover:border border-white">
                  <DueDateCompoent />
                </Table.Cell>

                {/* TASK STATUS */}
                <Table.Cell className=" text-white hover:border border-white">
                  <StatusComponent />
                </Table.Cell>

                {/* Task prorotiy */}
                <Table.Cell className=" text-white hover:border border-white">
                  <ProrityCompoent />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </Grid>
  );
};
