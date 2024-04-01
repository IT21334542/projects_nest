"use client";
import { AlertDialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
const { v4: uuidv4 } = require("uuid");
interface Forms {
  name: String;
}

const RoleCreate = ({ spaceid }: { spaceid: String }) => {
  const Roleid = uuidv4();
  const [isSubm, _setSubmi] = useState<boolean>(true);
  const { register, handleSubmit } = useForm<Forms>();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="violet">Assign a new Role</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>New Role</AlertDialog.Title>
        <form
          onSubmit={handleSubmit((data) => {
            const Role = {
              id: Roleid,
              name: data.name,
              spaceId: spaceid,
            };

            axios
              .post("/api/role", Role)
              .then(() => {
                _setSubmi(true);
              })
              .catch((err) => {
                console.log("Front error in Role creation" + err);
              });
          })}
        >
          <Text>Role Name</Text>
          <TextField.Root placeholder=" Role name" {...register("name")} />

          <Flex gap="3" mt="4" justify="end">
            {isSubm && (
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
            )}
            <AlertDialog.Action>
              <Button
                type="submit"
                variant="solid"
                color="red"
                onClick={() => {
                  _setSubmi(false);
                }}
              >
                Save
              </Button>
            </AlertDialog.Action>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default RoleCreate;
