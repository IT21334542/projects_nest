"use client";
import { SpaceCreateSchema } from "@/app/ValidationSchemas/SpaceValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { space } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiChevronsLeft, FiInfo, FiPlus } from "react-icons/fi";
import { z } from "zod";
const { v4: uuidv4 } = require("uuid");

interface SpaceForm {
  name: String;
  description: String;
}

const SpaceCreatePage = () => {
  const { data } = useSession();
  const [User, SetUser] = useState<string | null>(null);

  useEffect(() => {
    if (!User) SetUser(data?.user.id!);
  }, [data, User]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpaceForm>({});
  const Router = useRouter();
  const Handling = handleSubmit((data) => {
    const _SId: String = uuidv4();
    const Space = {
      id: _SId,
      name: data.name,
      description: data.description,
      createdby: User,
    };

    axios
      .post("/api/space", Space)
      .then((r) => {
        Router.push("/space/all");
      })
      .catch((err) => {
        console.log("Log.Creation in Space : " + err);
      });
  });

  return (
    <Flex className=" bg-[#292A2C] w-screen h-screen" direction={"column"}>
      <form onSubmit={Handling}>
        <Grid columns={"2"} height={"100%"}>
          <Box p={"6"}>
            <Link href={"/space/all"}>
              <FiArrowLeft
                color="#ffffff"
                size={30}
                className=" border border-white px-0.5 py-1 mb-6"
              />
            </Link>
            <Text className=" text-white text-2xl">Create new WorkSpace</Text>
            <br />
            <Box className=" mt-9">
              <Text weight={"light"} className=" text-white text-xl ">
                Space name
              </Text>
              <TextField.Root
                placeholder=" Space Name"
                className=" max-w-lg mt-2"
                {...register("name", {
                  required: "Name is Required",
                  minLength: 1,
                })}
              />
            </Box>

            {errors.name && (
              <Callout.Root variant="surface" color="red" m={"1"}>
                <Callout.Icon>
                  <FiInfo color="#ffffff" />
                </Callout.Icon>
                <Callout.Text color="red">
                  <Text className=" text-white">{errors.name.message}</Text>
                </Callout.Text>
              </Callout.Root>
            )}

            <Box className=" mt-9">
              <Text weight={"light"} className=" text-white text-xl ">
                Description
              </Text>
              <TextArea
                placeholder=" tell some facts about this workspace..."
                className=" max-w-lg mt-2"
                {...register("description")}
              />
            </Box>
            {User && (
              <Button type="submit" color="brown" mt={"6"}>
                <FiPlus color="#ffffff" />
                Create Space
              </Button>
            )}
          </Box>
          <Box className=" w-full h-full ">
            <Flex className=" h-full max-h-screen">
              <img
                src="https://images.pexels.com/photos/4348082/pexels-photo-4348082.jpeg?auto=compress&cs=tinysrgb&w=600"
                style={{
                  display: "block",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "var(--gray-5)",
                }}
              />
            </Flex>
          </Box>
        </Grid>
      </form>
    </Flex>
  );
};

export default SpaceCreatePage;
