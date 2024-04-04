import {
  Box,
  Container,
  Flex,
  Select,
  Skeleton,
  Spinner,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiFolder, FiPackage } from "react-icons/fi";

const SelectSpace = ({ id }: { id: String }) => {
  const Router = useRouter();
  const [_Spaces, _setSpaces] = useState<any | null>(null);
  const [_isLoading, _setLoading] = useState<boolean>(false);
  const { data } = useSession();

  useEffect(() => {
    _setLoading(true);
    console.log("AUSER KILL" + data?.user.id);
    if (data?.user) {
      axios
        .get("/api/user/spaces", {
          params: {
            id: data?.user.id,
          },
        })
        .then((value) => {
          _setSpaces(value.data.data);
          if (_Spaces) {
            _setLoading(false);
          }
        })
        .catch((err) => {
          console.error("ERROR SETCH" + err);
        });
    }
  }, [data]);

  return (
    <>
      {!_Spaces && (
        <Select.Root defaultValue="orange">
          <Select.Trigger />
          <Select.Content color="violet">
            <Select.Group>
              <Select.Item value="orange">
                <Spinner />
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      {_Spaces && (
        <>
          <FiPackage color="#ffffff" size={"1.5em"} />
          <Text className=" text-white" weight={"light"}>
            CURRENT SPACE
          </Text>
          <Select.Root
            onValueChange={(e) => {
              console.log(" Working S" + e);
              Router.push("/space/" + e);
            }}
            defaultValue={id.toString()}
          >
            <Select.Trigger />
            <Select.Content color="brown">
              <Select.Group>
                <Select.Label>Available Workspaces</Select.Label>
                {_Spaces.Space.map((spc: any, index: number) => {
                  return (
                    <Select.Item value={spc.id} key={index}>
                      <Flex align={"center"} gap={"2"}>
                        <FiFolder />
                        <Text weight={"light"} size={"3"} className="">
                          {spc.name}
                        </Text>
                      </Flex>
                    </Select.Item>
                  );
                })}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </>
      )}
    </>
  );
};

export default SelectSpace;
