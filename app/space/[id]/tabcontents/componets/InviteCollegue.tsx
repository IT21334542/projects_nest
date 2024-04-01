"use Client";
import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import RoleDropDown from "./RoleDropDown";
import axios from "axios";
const { v4: uuidv4 } = require("uuid");

interface FormStructre {
  email: String;
}

const InviteCollegue = ({
  spaceid,
  _setInvitings,
}: {
  spaceid: String;
  _setInvitings: any;
}) => {
  const Collegueid = uuidv4();
  const [SelectedRole, Selection] = useState<String | null>(null);
  const { register, handleSubmit } = useForm<FormStructre>();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="brown" mt={"2"} mr={"3"}>
          <FiMail color="#ffffff" size={"1.5em"} />
          <Text className=" text-white">Invite Colleague</Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Send an Invitation</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Send an invite to make your collegue to connect.
        </Dialog.Description>
        <form
          onSubmit={handleSubmit((fields) => {
            const Invite = {
              id: Collegueid,
              email: fields.email,
              roleid: SelectedRole,
              spaceid: spaceid,
            };
            axios
              .post("/api/colleague", Invite)
              .then(() => {
                _setInvitings(true);
              })
              .catch((err) => {
                console.log("err:front :creation invite issue :" + err);
              });
          })}
        >
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                placeholder="Enter Email"
                {...register("email")}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Role
              </Text>
              <RoleDropDown spaceid={spaceid} selectedRole={Selection} />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Send</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default InviteCollegue;
