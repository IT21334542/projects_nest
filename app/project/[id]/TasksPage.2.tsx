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
  Spinner,
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
import { BarLoader, SyncLoader } from "react-spinners";
import { motion } from "framer-motion";

const ProrityCompoent = ({
  prority,
  task,
  isChange,
  updateSelect,
}: {
  prority: TaskPriority;
  task: any;
  isChange: any;
  updateSelect: any;
}) => {
  return (
    <Select.Root
      defaultValue={prority}
      onValueChange={(e: TaskPriority) => {
        const Ut = {
          id: task.id,
          taskname: task.taskname,
          status: task.status,
          prority: e,
          projectId: task.projectId,
          duedate: task.duedate,
          description: task.description,
          assigned_By: task.assigned_By,
          assigned_To: task.assigned_To,
        };
        task.prority = e;
        console.log("PRo : " + JSON.stringify(Ut));
        updateSelect(Ut);
        isChange(true);
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
  task,
  isChange,
  updateSelect,
}: {
  status: TaskStatus;
  task: any;
  isChange: any;
  updateSelect: any;
}) => {
  return (
    <Select.Root
      defaultValue={status}
      onValueChange={(e: TaskStatus) => {
        const Ut = {
          id: task.id,
          taskname: task.taskname,
          status: e,
          prority: task.prority,
          projectId: task.projectId,
          duedate: task.duedate,
          description: task.description,
          assigned_By: task.assigned_By,
          assigned_To: task.assigned_To,
        };
        task.status = e;
        console.log("Status : " + JSON.stringify(Ut));
        updateSelect(Ut);
        isChange(true);
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
  Exdate,
  task,
  isChange,
  updateSelect,
}: {
  Exdate: string;
  task: any;
  isChange: any;
  updateSelect: any;
}) => {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    if (Exdate) setDate(new Date(Exdate));
  }, []);
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
                const Ut = {
                  id: task.id,
                  taskname: task.taskname,
                  status: task.status,
                  prority: task.prority,
                  projectId: task.projectid,
                  duedate: date,
                  description: task.description,
                  assigned_By: task.assigned_By,
                  assigned_To: task.assigned_To,
                };
                task.duedate = date;
                console.log("DATE : " + JSON.stringify(Ut));
                updateSelect(Ut);
                isChange(true);
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

  //New task components
  const [TasksAll, setAllTAsks] = useState<any | null>(null);
  const [isTaskAdded, _setTaskAdding] = useState<string>("");

  //row values
  const [_NameChanged, _setNameChange] = useState<string>();

  //change tracker
  const [isChanged, setisChange] = useState<boolean>(false);
  const [isBluredRow, setIsBlur] = useState<string | null>();

  //selectedTask
  const [TaskSelected, SetTaskSelected] = useState<any | null>(null);

  const [isSubmiting, setSubmiting] = useState<boolean>(false);
  const [SubmitError, SetSubmiterror] = useState<boolean>(false);

  //loading spinner until fetch
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isChanged) {
      if (!isSubmiting) {
        SetSubmiterror(true);
        setSubmiting(true);
        axios
          .put("/api/task", TaskSelected)
          .then((v) => {
            if (v.status == 200) {
              _setTaskAdding(
                new Date().getMilliseconds.toString() +
                  new Date().getUTCSeconds.toString()
              );
              setSubmiting(false);
              setisChange(false);
              SetSubmiterror(false);
            }
          })
          .catch((err) => {
            console.error("FRONT CALL p:Task \t" + err);
          });
      } else {
        // SetSubmiterror(true);
      }
    }
  }, [isChanged]);

  //get tasks
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/task/", {
        params: {
          project: props.Id,
        },
      })
      .then((value) => {
        if (value.status == 200) {
          setAllTAsks(value.data.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Front error task:p " + err);
        setIsLoading(false);
      });
  }, [isTaskAdded]);

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
                  setAllTAsks([]);
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
              {TasksAll && !isLoading && (
                <>
                  <>
                    {TasksAll.length == 0 && (
                      <Flex
                        className=" w-full h-72"
                        justify={"center"}
                        align={"center"}
                      >
                        <SyncLoader color="#ffffff" size={"20"} />
                      </Flex>
                    )}
                  </>
                  <>
                    {TasksAll.map((task: any, index: number) => {
                      return (
                        <Table.Row
                          key={index}
                          align="center"
                          className="  rounded-full hover:bg-[#292A2C] cursor-pointer mt-2"
                        >
                          {/* TASK NAME */}
                          <Table.RowHeaderCell
                            className=" text-white hover:border "
                            onClick={() => {
                              if (!_isElement) {
                                props.setFun(task.id);
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
                                onChange={(e) => {
                                  _setNameChange(e.currentTarget.value);
                                }}
                                variant="soft"
                                color="violet"
                                className=" hover:border border-white border-opacity-20 "
                                defaultValue={task.taskname}
                                style={{
                                  color: "#ffffff",
                                  background: "#292A2C",
                                  width: "350px",
                                }}
                                placeholder="enter task name..."
                                onBlur={() => {
                                  task.taskname = _NameChanged;
                                  const Ut = {
                                    id: task.id,
                                    taskname: _NameChanged!,
                                    status: task.status,
                                    prority: task.prority,
                                    projectId: props.Id,
                                    duedate: task.duedate,
                                    description: task.description,
                                    assigned_By: task.assigned_By,
                                    assigned_To: task.assigned_To,
                                  };
                                  console.log("NAME : " + JSON.stringify(Ut));
                                  SetTaskSelected(Ut);
                                  setisChange(true);
                                }}
                                onMouseEnter={() => {
                                  _setIsElement(true);
                                }}
                                onMouseLeave={() => {
                                  _setIsElement(false);
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
                              AssignedColId={
                                task.assignedTo ? task.assignedTo.id : ""
                              }
                              AssignedColsrc={
                                task.assignedTo
                                  ? task.assignedTo.userID.image
                                  : ""
                              }
                              task={task}
                              updateSelect={SetTaskSelected}
                              isChange={setisChange}
                            />
                          </Table.Cell>

                          {/* DATE DUE */}
                          <Table.Cell className=" text-white hover:border border-white">
                            <DueDateCompoent
                              Exdate={task.duedate ? task.duedate : null}
                              task={task}
                              isChange={setisChange}
                              updateSelect={SetTaskSelected}
                            />
                          </Table.Cell>

                          {/* TASK STATUS */}
                          <Table.Cell className=" text-white hover:border border-white">
                            <StatusComponent
                              status={task.status}
                              task={task}
                              isChange={setisChange}
                              updateSelect={SetTaskSelected}
                            />
                          </Table.Cell>

                          {/* Task prorotiy */}
                          <Table.Cell className=" text-white hover:border border-white">
                            <ProrityCompoent
                              prority={task.prority}
                              task={task}
                              isChange={setisChange}
                              updateSelect={SetTaskSelected}
                            />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </>
                </>
              )}
            </Table.Body>
          </Table.Root>
          {!TasksAll && !isLoading && (
            <motion.div>
              <Flex
                className=" w-full h-96 mt-10"
                justify={"center"}
                align={"center"}
              >
                <img src="/vector1.png" className=" object-center  w-1/6" />
              </Flex>
            </motion.div>
          )}

          {isLoading && (
            <Flex className=" w-full h-72" justify={"center"} align={"center"}>
              <SyncLoader color="#ffffff" size={"20"} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Grid>
  );
};
