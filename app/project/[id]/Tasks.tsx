"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Popover,
  Table,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiArrowLeftCircle,
  FiArrowRight,
  FiBookmark,
  FiCalendar,
  FiCamera,
  FiCheck,
  FiClipboard,
  FiEdit3,
  FiPlus,
  FiSave,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { TaskStatus, Tasks as T } from "prisma/prisma-client";
import { motion, useScroll } from "framer-motion";
import FileCard from "./componets/Files/FileCard";
import Calendar from "react-calendar";
import { CiShoppingBasket } from "react-icons/ci";
import FileComp from "./componets/FileComp";

const Tasks = (props: { taskopen: any; task: String }) => {
  const [_FilesMap, _setFilesMap] = useState<any[]>();
  const Scroll = useScroll();
  const { taskopen } = props;
  const [Tsk, setTsk] = useState<any>();
  const [imageSel, setImageselection] = useState<boolean>(false);
  const [EditingDescription, SetDescriptionEdit] = useState<boolean>(false);
  const [isSubadded, setSubadded] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isFilesadded, setFilesAdded] = useState<boolean>(false);
  const [DEsc, setDesc] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get("/api/task/Tasks", {
        params: {
          id: props.task,
        },
      })
      .then((v) => {
        if (v.status == 200) {
          setTsk(v.data.data);
          setSubadded(false);
          setFilesAdded(false);
        }
      })
      .catch((Err) => {
        console.error("Front error " + Err);
      });
  }, [isSubadded, isFilesadded]);

  useEffect(() => {
    if (isAdd) {
      axios
        .post("/api/subtask", {
          task: Tsk.id,
        })
        .then((v) => {
          if ((v.status = 201)) {
            setSubadded(true);
          }
        })
        .catch((e) => {
          console.error("front error " + e);
        });
    }
  }, [isAdd]);

  return (
    <Flex
      className=" h-full ml-3 border-l-2 border-white border-opacity-30 overflow-scroll"
      direction={"column"}
      p={"3"}
    >
      {/* <Flex className=" h-1/2 w-1/4 bg-slate-950 z-10 border absolute"></Flex> */}

      {Tsk && (
        <Grid mb={"9"}>
          {/* top bar */}
          <Flex
            className=" w-full h-11 border-b-2 border-white border-opacity-20 "
            justify={"between"}
          >
            <Flex align={"end"} gap={"2"} mb={"4"} ml={"5"}>
              <Tooltip content="mark">
                <FiClipboard color="#ffffff" size={"2em"} />
              </Tooltip>
              <Text className=" text-white font-lg" weight={"medium"}>
                {Tsk ? Tsk.taskname : " No"}
              </Text>
            </Flex>
            <Flex>
              <FiArrowRight
                size={"2em"}
                color=" #ffffff"
                onClick={() => {
                  taskopen(null);
                }}
              />
            </Flex>
          </Flex>
          {/* Description */}
          <Flex direction={"column"} m={"3"}>
            <Text className=" text-white" weight={"light"}></Text>
            <Box maxHeight="300px" maxWidth={"100%"} height={"100%"}>
              <TextArea
                onChange={(e) => {
                  setDesc(e.currentTarget.value);
                }}
                disabled={!EditingDescription}
                defaultValue={
                  Tsk.description ? Tsk.description : "Add a description"
                }
                placeholder=" description"
                size={"2"}
                style={{
                  height: "200px",
                }}
              />
            </Box>
            <Flex className=" w-full" m={"3"} gap={"4"}>
              <Button
                color="violet"
                onClick={() => {
                  SetDescriptionEdit(true);
                }}
              >
                <FiEdit3 color="#ffffff" />
                Edit
              </Button>
              {EditingDescription && (
                <Button
                  color="green"
                  onClick={() => {
                    axios
                      .patch(
                        "/api/task/T",
                        {
                          id: Tsk.id,
                          description: DEsc,
                        },
                        {
                          params: {
                            Disc: true,
                          },
                        }
                      )
                      .then((v) => {
                        if (v.status == 200) {
                          setDesc(null);
                          SetDescriptionEdit(false);
                        }
                      })
                      .catch((err) => {
                        console.error("Error front task single" + err);
                      });
                  }}
                >
                  <FiSave color="#ffffff" />
                  Save
                </Button>
              )}
            </Flex>
          </Flex>

          {/* table rows */}
          <Flex className=" w-1/2" align={"center"}>
            <Table.Root m={"4"}>
              <Table.Header></Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell
                    className=" border border-white text-white "
                    colSpan={3}
                    justify={"center"}
                    align="center"
                  >
                    <Text align={"center"}>Assigned to</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell className=" border border-white text-white ">
                    <Avatar
                      src={Tsk ? Tsk.assignedTo.userID.image : ""}
                      fallback="a"
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell
                    className=" border border-white text-white "
                    colSpan={3}
                    justify={"center"}
                    align="center"
                  >
                    Due Date
                  </Table.RowHeaderCell>
                  <Table.Cell className=" border border-white text-white ">
                    {Tsk ? (
                      <Text>{new Date(Tsk.duedate).toDateString()}</Text>
                    ) : (
                      <Badge color="mint">Not Assigned</Badge>
                    )}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Flex>

          {/* files */}
          <Flex direction={"column"}>
            <Text
              className=" text-white underline m-3"
              size={"5"}
              weight={"light"}
            >
              Files
            </Text>

            {/* Buttons */}
            <Flex gap={"3"} className=" w-full" justify={"end"}>
              <Tooltip content="Select from space library">
                <Button
                  color="brown"
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setImageselection(true);
                  }}
                >
                  <FiBookmark color="#ffffff" />
                  Space Library
                </Button>
              </Tooltip>
              <Tooltip content="Upload new file">
                <Button color="brown" className=" hover:cursor-pointer">
                  <FiUploadCloud color="#ffffff" />
                  Upload
                </Button>
              </Tooltip>
            </Flex>

            {/* Image selection component */}
            <motion.div
              className=" bg-[#292A2C] mt-10 flex flex-col"
              initial={{
                height: 0,
                width: "100%",
              }}
              animate={
                imageSel
                  ? {
                      height: "300px",
                      width: "100%",
                      visibility: "visible",
                    }
                  : {
                      height: "0px",
                      width: "100%",
                      visibility: "hidden",
                    }
              }
            >
              <Flex
                className=" w-full h-1/5 text-white  border-t border-b "
                align={"center"}
              >
                <Text className=" ml-4">Select Resources</Text>
              </Flex>
              <Flex className=" w-full h-3/5 border">
                <Grid flow={"column"} gapX={"2"} overflowX={"scroll"}>
                  <FileComp
                    spaceid={Tsk.projectid.spaceid.id}
                    SelectionArray={_setFilesMap}
                  />
                </Grid>
              </Flex>
              {/* Btna */}
              <Flex
                className=" w-full h-1/5 border pr-4"
                align={"center"}
                justify={"between"}
              >
                <Flex className=" text-white" align={"center"}>
                  <CiShoppingBasket color="#ffffff" size={"2.5em"} />
                  <Text>Selected Resources</Text>
                  <Text>{_FilesMap?.length}</Text>
                </Flex>
                <Flex gap={"3"}>
                  <Button
                    color="gray"
                    onClick={() => {
                      setImageselection(false);
                    }}
                  >
                    <FiX color="#ffffff" />
                    Cancel
                  </Button>
                  <Button
                    color="violet"
                    onClick={() => {
                      const FileList: any[] = [];
                      _FilesMap?.map((f) => {
                        const F = {
                          id: f.id,
                          taskid: Tsk.id,
                          projectId: Tsk.projectid.id,
                        };
                        FileList.push(F);
                      });
                      axios
                        .patch("/api/files", FileList, {
                          params: {
                            action: "Task",
                          },
                        })
                        .then((v) => {
                          if (v.status == 200) {
                            console.log("Success" + v.data.data);
                            _setFilesMap([]);
                            setImageselection(false);
                            setFilesAdded(true);
                          }
                        })
                        .catch((err) => {
                          console.log("Update error:" + err);
                          setImageselection(false);
                        });
                    }}
                  >
                    <FiSave color="#ffffff" />
                    Save
                  </Button>
                </Flex>
              </Flex>
            </motion.div>

            {/* Filecards */}

            {/* {no files available} */}
            {Tsk.Files.length == 0 && (
              <Flex
                className=" w-full text-white h-38   mt-8 p-1"
                align={"center"}
                direction={"column"}
              >
                <Flex
                  className=" w-1/2 h-full border pt-3 bg-slate-400 rounded"
                  direction={"column"}
                  align={"center"}
                >
                  <img
                    src="https://www.shutterstock.com/image-vector/flat-icon-no-files-found-260nw-2259354543.jpg"
                    className=" object-cover aspect-video w-11/12"
                  />
                  <Text>No Files available</Text>
                </Flex>
              </Flex>
            )}

            {/* if files available */}
            {Tsk.Files.length != 0 && (
              <Flex className=" w-full" m={"3"} justify={"center"}>
                <Grid
                  columns={"2"}
                  align={"center"}
                  justify={"center"}
                  className=" w-fit"
                  gapX={"9"}
                  gapY={"2"}
                >
                  {Tsk.Files.map((file: any, index: number) => {
                    return (
                      <FileCard
                        key={index}
                        id={file.id}
                        name={file.name}
                        url={file.url}
                        type={file.type}
                      />
                    );
                  })}
                </Grid>
              </Flex>
            )}
          </Flex>

          <Flex direction={"column"} className=" text-white">
            <Text
              className=" text-white underline m-3"
              size={"5"}
              weight={"light"}
            >
              SubTasks
            </Text>
            <Flex className=" w-full border" direction={"column"}>
              {/* Btn Add subtask */}
              <Flex
                className=" w-full h-14 mb-2 border-b"
                justify={"end"}
                p={"2"}
              >
                <Button
                  color="brown"
                  onClick={() => {
                    setIsAdd(true);
                  }}
                >
                  <FiPlus color="#ffffff" />
                  <Text>Subtask</Text>
                </Button>
              </Flex>

              {/* Sub task table */}
              <Flex className=" w-full ">
                <Table.Root className=" w-full">
                  <Table.Header>
                    <Table.ColumnHeaderCell className=" border-b border-t">
                      Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className=" border-b border-t">
                      DueDate
                    </Table.ColumnHeaderCell>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell
                        className=" text-white hover:border"
                        colSpan={2}
                      >
                        <TextField.Root
                          className=" hover:border"
                          placeholder=""
                          variant="soft"
                          color="brown"
                          defaultValue={"kumar"}
                          style={{
                            backgroundColor: "#292A2C",
                            color: "white",
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell
                        className=" text-white hover:border"
                        colSpan={1}
                      >
                        <Popover.Root>
                          <Popover.Trigger>
                            <Button variant="soft">
                              <FiCalendar width="16" height="16" />
                            </Button>
                          </Popover.Trigger>
                          <Popover.Content>
                            <Popover.Close>
                              <Button>Clopse</Button>
                            </Popover.Close>
                          </Popover.Content>
                        </Popover.Root>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      )}
    </Flex>
  );
};

export default Tasks;
