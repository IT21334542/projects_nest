"use client";
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { randomInt } from "crypto";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { json } from "stream/consumers";
const { v4: uuidv4 } = require("uuid");

interface ProjectFormStructre {
  name: String;
  descrption: String;
  space: String;
}

interface Space {
  name: string;
  id: string;
  description: String;
  createdby: String;
}
const BlankProjectpage = () => {
  const PicArry = [
    "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
    "https://fastly.picsum.photos/id/194/2000/1325.jpg?hmac=fZjOIhEZbokJJSAVltL4uWaBmdFJYsS5nMgjrlLFtt8",
    "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
    "https://fastly.picsum.photos/id/89/4608/2592.jpg?hmac=G9E4z5RMJgMUjgTzeR4CFlORjvogsGtqFQozIRqugBk",
  ];
  const rand = Math.floor(Math.random() * PicArry.length);

  const { register, handleSubmit } = useForm<ProjectFormStructre>();
  const [_SpaceList, _setSpaceList] = useState<Space[]>([]);
  const [_SlectionValue, _setSelectionValue] = useState<string | null>(null);
  const Session = useSession();
  const router = useRouter();

  useEffect(() => {
    axios;
    axios
      .get("/api/space", {
        params: {
          Ur: Session.data?.user.id,
        },
      })
      .then((value) => {
        _setSpaceList(value.data.data);
      })
      .catch((err) => {
        console.log("Log.D error in fetching Spaces :" + err);
      });
  }, [Session]);

  return (
    <Flex
      className=" h-full w-full overflow-hidden bg-[#292A2C]"
      direction={"column"}
      justify={"center"}
      align={"center"}
    >
      <Grid className=" h-full w-full max-h-full max-w-full" columns={"2"}>
        <form
          onSubmit={handleSubmit((data) => {
            if (_SlectionValue) {
              const _SId: String = uuidv4();
              const Project = {
                id: _SId,
                name: data.name,
                description: data.descrption,
                spaceId: _SlectionValue,
                OwnerId: Session.data?.user.id,
              };

              axios
                .post("/api/projects", Project)
                .then((value) => {
                  router.push("/project/all");
                })
                .catch((err) => {
                  console.log(
                    "Log.frontend - pageProject_create_newproject_ post error :" +
                      err
                  );
                });
            }
          })}
        >
          <Box p={"6"}>
            <Link href={"/project/all"}>
              <FiArrowLeft
                color="#ffffff"
                size={30}
                className=" border border-white px-0.5 py-1 mb-6"
              />
            </Link>
            <Text className=" text-white text-2xl">Create new project</Text>
            <br />
            <Box className=" mt-9">
              <Text weight={"light"} className=" text-white text-xl ">
                Project name
              </Text>
              <TextField.Root
                placeholder=" Project name"
                className=" max-w-lg mt-2"
                {...register("name", {
                  required: "Name is required",
                  minLength: 1,
                })}
              />
            </Box>
            <Box className=" mt-9">
              <Text weight={"light"} className=" text-white text-xl ">
                Description
              </Text>
              <TextArea
                placeholder=" tell some facts about this project..."
                className=" max-w-lg mt-2"
                {...register("descrption")}
              />
            </Box>
            <br />
            <Box>
              <Flex gapX={"3"}>
                <Text weight={"light"} className=" text-white text-xl ">
                  WorkSpace Belong to
                </Text>

                <Select.Root
                  defaultValue={"Select"}
                  onValueChange={(value) => {
                    _setSelectionValue(value);
                  }}
                >
                  <Select.Trigger className="  font-semibold" />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Available WorkSpaces</Select.Label>
                      {_SpaceList!.map((space, index) => {
                        return (
                          <Select.Item
                            key={index}
                            value={space.id}
                            className=" font-semibold"
                          >
                            {space.name}
                          </Select.Item>
                        );
                      })}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Box>

            <Button type="submit" color="brown" mt={"6"}>
              <FiPlus color="#ffffff" />
              Create Project
            </Button>
          </Box>
        </form>
        <Flex className=" w-full h-full ">
          <Image alt="" src={PicArry[0]} />
        </Flex>
      </Grid>
    </Flex>
  );
};

export default BlankProjectpage;
