"use client";
import { Flex, Text, Button } from "@radix-ui/themes";
import NavBar from "./componets/NavBar";
import SideBar from "./componets/SideBar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MyApp() {
  const router = useRouter();
  const Session = useSession();
  if (Session.data) {
    console.log("have token");
    if (Session.data.user.isMaster) {
      console.log("hello master");
      router.push("/space/all");
    }
  }

  return (
    <>
      <Flex
        className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
        direction={"column"}
        justify={"center"}
        align={"center"}
      >
        <Text className=" text-white">
          Page under contruction.. sorry for the inconvience.. just sign up and
          move browse throught other page
        </Text>
        <Link href={"/api/auth/signin"}>
          <Button>Sign in with Google</Button>
        </Link>
      </Flex>
    </>
  );
}
