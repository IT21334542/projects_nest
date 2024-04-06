"use client";
import { Flex, Strong, Text } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader, ScaleLoader } from "react-spinners";
import Logo from "./componets/Logo";

export default function MyApp() {
  const { data, status } = useSession();
  const [_isConfiguring, _setConfiguring] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/signup");
    }

    if (status == "authenticated") {
      setTimeout(() => {
        _setConfiguring(true);
        if (data.user.isMaster) {
          console.log("MASTER");
          router.push("/space/all");
          _setConfiguring(false);
        } else {
          axios
            .get("/api/invite", {
              params: {
                id: data.user.email,
              },
            })
            .then((value) => {
              //IF THE INVITE IS AVAILABLE and Valid email
              if (value.status == 200) {
                const DATA: [] = value.data.data;

                //if Invite is Available not an empty find
                if (DATA.length != 0) {
                  console.log("VALUE" + JSON.stringify(value.data.data));
                  router.push("/invite");
                  return;
                } else {
                  //Request sucess and no invite available

                  //check is User isAdmin for any
                  if (data.user.isAdmin) {
                    router.push("/project/all");
                  }

                  //is user is staff
                  if (data.user) {
                  }
                }
              }
            })
            .catch((err) => {
              //IF ADMIN AND NO REQUEST GO TO SPACE ID PAGE
              //IF USER IS STAFF AND NO INVITE AVAILABLE

              console.error("FRONT ERR myApp-p ;" + err);
            });
        }
      }, 2000);

      //IF MASTER GO TO ALL SPACE PAGE
    }
  }, [data, status]);

  return (
    <>
      <Flex
        className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
        direction={"column"}
        justify={"center"}
        align={"center"}
      >
        {status == "loading" && (
          <Flex
            className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
            direction={"column"}
            justify={"center"}
            align={"center"}
          >
            <Text className=" text-white" weight={"light"} size={"9"}>
              "Welcome to <Strong>Canvonest</Strong>!{" "}
            </Text>
            <Text className=" text-white" size={"5"}>
              {" "}
              Explore, create, and collaborate like never before. Get ready to
              unlock endless possibilities.
            </Text>
            <br />
            <Logo w={200} h={200} />
            <br />
            <Text className=" text-white" size={"5"} mb={"3"}>
              stay tuned, we Checking User Status....
            </Text>
            <BarLoader color="#ffffff" width={"40%"} />
          </Flex>
        )}
        {!_isConfiguring && status == "authenticated" && (
          <Flex
            className=" h-screen w-screen m-o p-0 bg-[#292A2C]"
            direction={"column"}
            justify={"center"}
            align={"center"}
          >
            <Text className=" text-white" weight={"light"} size={"9"}>
              "Welcome to <Strong>Canvonest</Strong>!{" "}
            </Text>
            <Text className=" text-white" size={"5"}>
              {" "}
              Explore, create, and collaborate like never before. Get ready to
              unlock endless possibilities.
            </Text>
            <br />
            <Logo w={200} h={200} />
            <br />
            <Text className=" text-white" size={"5"} mb={"3"}>
              {" "}
              Things getting Ready... please wait
            </Text>
            <ScaleLoader color="#ffffff" />
          </Flex>
        )}
      </Flex>
    </>
  );
}
