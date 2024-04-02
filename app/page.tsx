"use client";
import { Flex, Text, Button, Spinner } from "@radix-ui/themes";
import NavBar from "./componets/NavBar";
import SideBar from "./componets/SideBar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BarLoader, ScaleLoader } from "react-spinners";
import axios from "axios";
import { error } from "console";

export default function MyApp() {
  const { data, status } = useSession();
  const [_isConfiguring, _setConfiguring] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/api/auth/signin");
    }

    if (status == "authenticated") {
      _setConfiguring(true);
      //IF MASTER GO TO ALL SPACE PAGE
      if (data.user.isMaster) {
        router.push("/space/all");
        _setConfiguring(false);
      }
      axios
        .get("/api/invite", {
          params: {
            id: data.user.email,
          },
        })
        .then((value) => {
          router.push("/invite");
        })
        .catch((err) => {
          //IF ADMIN AND NO REQUEST GO TO SPACE ID PAGE
          if (data.user.isAdmin) {
          }
        });
    }
  }, [data, status]);

  return (
    <>
      {status == "loading" && (
        <Flex
          className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
          direction={"column"}
          justify={"center"}
          align={"center"}
        >
          <Text className=" text-white"> Checking User Status....</Text>
          <BarLoader color="#ffffff" />
        </Flex>
      )}
      {_isConfiguring && (
        <Flex
          className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
          direction={"column"}
          justify={"center"}
          align={"center"}
        >
          <Text className=" text-white">
            {" "}
            Things getting Ready.. please wait
          </Text>
          <ScaleLoader color="#ffffff" />
        </Flex>
      )}
    </>
  );
}
