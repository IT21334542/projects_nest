"use client";
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
import React, { useEffect, useState } from "react";
import { FiFolder } from "react-icons/fi";

const SelectSpace = () => {
  const [_Spaces, _setSpaces] = useState<any | null>();
  const [_isLoading, _setLoading] = useState<boolean>(false);
  const { data } = useSession();

  useEffect(() => {
    _setLoading(true);
    axios
      .get("/api/spaces", {
        params: {
          id: data?.user.id,
        },
      })
      .then((value) => {
        _setSpaces(value.data.data);
        _setLoading(false);
      })
      .catch((err) => {
        console.error("ERROR SETCH" + err);
      });
  }, []);

  return (
    <>
      {_isLoading && (
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
      {!_isLoading && (
        <Select.Root defaultValue="orange">
          <Select.Trigger />
          <Select.Content color="violet">
            <Select.Group>
              <Select.Label>Available Status</Select.Label>
              <Select.Item value="orange">
                <Flex align={"center"} gap={"2"}>
                  <FiFolder />
                  <Text weight={"light"} size={"3"} className="">
                    Test1
                  </Text>
                </Flex>
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
    </>
  );
};

export default SelectSpace;
