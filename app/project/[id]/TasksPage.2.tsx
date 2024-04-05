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
import React, { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import AssignTaskMember from "./componets/AssignTaskMember";
import Calendar from "react-calendar";
import axios from "axios";
import { TaskPriority, TaskStatus, Tasks } from "prisma/prisma-client";

const ProrityCompoent = ({
  prority,
  changetrigger,
}: {
  prority: TaskPriority;
  changetrigger: any;
}) => {
  return (
    <Select.Root
      defaultValue={prority}
      onValueChange={(e: TaskPriority) => {
        changetrigger(e);
        console.log("Priority", e);
      }}
    >
      <Select.Trigger variant="ghost" color="violet" />
      <Select.Content
        color="violet"
        highContrast={false}
        style={{
          background: "#292A2C",
          color: "Background",
        }}
      >
        <Select.Item value={TaskPriority.LOW}>
          <Badge size={"2"} variant="solid" color="green">
            Low
          </Badge>
        </Select.Item>
        <Select.Item value={TaskPriority.MEDIUM}>
          <Badge size={"2"} variant="solid" color="yellow">
            Medium
          </Badge>
        </Select.Item>
        <Select.Item value={TaskPriority.HIGH}>
          <Badge size={"2"} variant="solid" color="red">
            High
          </Badge>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const StatusComponent = ({
  status,
  cngTrigger,
}: {
  status: TaskStatus;
  cngTrigger: any;
}) => {
  return (
    <Select.Root
      defaultValue={status}
      onValueChange={(e: TaskStatus) => {
        cngTrigger(e);
      }}
    >
      <Select.Trigger variant="ghost" />
      <Select.Content
        highContrast={false}
        style={{
          background: "#292A2C",
          color: "Background",
        }}
        color="violet"
      >
        <Select.Item value={TaskStatus.OPEN}>
          <Badge size={"2"} variant="solid" color="grass">
            OPEN
          </Badge>
        </Select.Item>
        <Select.Item value={TaskStatus.CLOSE}>
          <Badge size={"2"} variant="solid" color="cyan">
            Close
          </Badge>
        </Select.Item>
        <Select.Item value={TaskStatus.ON_PROCESS}>
          <Badge size={"2"} variant="solid" color="plum">
            On progress
          </Badge>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const DueDateCompoent = ({
  existingDate,
  setTrigger,
}: {
  existingDate: any;
  setTrigger: any;
}) => {
  const [date, setDate] = useState<Date | null>(existingDate);
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            <Button
              color="brown"
              onClick={() => {
                setTrigger(date);
              }}
            >
              Close
            </Button>
          </Popover.Close>
          <Popover.Close>
            <Button
              color="bronze"
              onClick={() => {
                setDate(null);
                setTrigger(null);
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
  const [_isBlur, _setIsblur] = useState<boolean>(false);
  const [isTaskAdded, _setTaskAdding] = useState<string>("");
  //All TASK HOLDER
  const [TasksAll, setAllTAsks] = useState<any | null>(null);

  //TRACK THE SELECTED ROW
  const [_TASKSELECTED, _setTASKSELECTED] = useState<Tasks | null>(null);

  //row values
  const [_NameChanged, _setNameChange] = useState<String>();
  const [_ASSIGNEECHANGED, _setASSIGNEECHANGE] = useState<String>();
  const [_CHANGEDDATE, _setCHANGEDDATE] = useState<Date | null>();
  const [_STATUSCHANGE, _setSTATUSCHANGE] = useState<TaskStatus | null>();
  const [_PRORITYCHANGE, _setPRORITYCHANGE] = useState<TaskPriority | null>();

  //change tracker
  const [ischanged, setChanged] = useState<boolean>(false);

  const [_SubmitElement, _setSubmit] = useState<any>(null);
  const [MakeSubmit, _SetMakeSubmit] = useState<boolean>(false);

  //get tasks
  useEffect(() => {
    axios
      .get("/api/task/", {
        params: {
          project: props.Id,
        },
      })
      .then((value) => {
        setAllTAsks(value.data.data);
      })
      .catch((err) => {
        console.error("Front error task:p " + err);
      });
  }, [isTaskAdded]);

  //track row and update db
  useEffect(() => {
    console.log("Mouse outing 0");
    if (_TASKSELECTED) {
      console.log("Mouse outing 1");
      //no changes present
      if (!ischanged) {
        console.log("Mouse outing is not changed");
        console.log("Setting new Row");
        _setNameChange(_TASKSELECTED?.taskname!);
        _setASSIGNEECHANGE(_TASKSELECTED?.assigned_To!);
        _setCHANGEDDATE(_TASKSELECTED?.duedate!);
        _setSTATUSCHANGE(_TASKSELECTED?.status!);
        _setPRORITYCHANGE(_TASKSELECTED?.prority!);
        console.log(
          "Updating priority",
          _TASKSELECTED?.prority!,
          _TASKSELECTED?.taskname
        );
      } else {
        console.log("mouse outing is changed");
        //change present
        console.log("Submitting arc");
        const NewTask = {
          id: _TASKSELECTED?.id,
          taskname: _NameChanged,
          description: _TASKSELECTED?.description,
          duedate: _CHANGEDDATE,
          prority: _PRORITYCHANGE,
          status: _STATUSCHANGE,
          assigned_By: _TASKSELECTED?.assigned_By,
          assigned_To: _ASSIGNEECHANGED,
          projectId: _TASKSELECTED?.projectId,
        };
        console.log("New Task", NewTask, _PRORITYCHANGE);
        axios
          .put("/api/task", NewTask)
          .then((v) => {
            console.log("Clearing data");
            setChanged(false);
            _setTASKSELECTED(null);

            //Refrsh
            _setASSIGNEECHANGE("");
            _setNameChange("");
            _setCHANGEDDATE(null);
            _setSTATUSCHANGE(null);
            _setPRORITYCHANGE(null);
            _setTaskAdding(v.data.data.id);
          })
          .catch((err) => {
            console.error("front error :" + err);
          });
      }
    }
    console.log("Mouse is outing finish");
  }, [_TASKSELECTED, _isBlur]);

  //track change
  useEffect(() => {
    if (_TASKSELECTED) {
      console.log("Tracking started");
      setChanged(true);
    }
  }, [
    _NameChanged,
    _ASSIGNEECHANGED,
    _CHANGEDDATE,
    _STATUSCHANGE,
    _PRORITYCHANGE,
  ]);

  return (
    <Grid justify={"center"}>
      <Flex direction={"column"}>
        <Flex className=" border-b-2 border-white  border-opacity-50 mx-3  mb-6 ">
          <Button
            color="brown"
            onClick={() => {
              axios
                .post(
                  "/api/task",
                  {},
                  {
                    params: {
                      project: props.Id,
                    },
                  }
                )
                .then((v) => {
                  _setTaskAdding(v.data.data.id);
                })
                .catch((err) => {
                  console.error("creation err" + err);
                });
            }}
          >
            Add task
          </Button>
        </Flex>
        <Flex direction={"column"} onBlur={() => _setIsblur(false)}>
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
              {TasksAll && (
                <>
                  {TasksAll.map((task: any, index: number) => {
                    return (
                      <Table.Row
                        key={index}
                        align="center"
                        className="  rounded-full hover:bg-[#292A2C] cursor-pointer mt-2"
                        onClick={() => {
                          _setTASKSELECTED(task);
                          _setIsblur(true);
                          console.log("Setting is blur to 1");
                        }}
                        onBlur={() => {
                          _setTASKSELECTED(task);
                          _setIsblur(false);
                          console.log("Mouse is outing", task);
                        }}
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
                              defaultValue={task ? task.taskname : ""}
                              style={{
                                color: "#ffffff",
                                background: " #292A2C",
                                width: "350px",
                              }}
                              placeholder="enter task name..."
                              onMouseEnter={() => {
                                _setIsElement(true);
                              }}
                              onMouseLeave={() => {
                                _setIsElement(false);
                              }}
                              onChange={(e) => {
                                _setNameChange(e.currentTarget.value);
                                console.log("Onchange:", _NameChanged);
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
                            colabid={task.assignedTo ? task.assignedTo.id : ""}
                            id={props.Id}
                            _SetASSIGNEECHANGE={_setASSIGNEECHANGE}
                          />
                        </Table.Cell>

                        {/* DATE DUE */}
                        <Table.Cell className=" text-white hover:border border-white">
                          <DueDateCompoent
                            existingDate={_CHANGEDDATE}
                            setTrigger={_setCHANGEDDATE}
                          />
                        </Table.Cell>

                        {/* TASK STATUS */}
                        <Table.Cell className=" text-white hover:border border-white">
                          <StatusComponent
                            status={task.status}
                            cngTrigger={_setSTATUSCHANGE}
                          />
                        </Table.Cell>

                        {/* Task prorotiy */}
                        <Table.Cell className=" text-white hover:border border-white">
                          <ProrityCompoent
                            prority={task.prority}
                            changetrigger={_setPRORITYCHANGE}
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </>
              )}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </Grid>
  );
};
