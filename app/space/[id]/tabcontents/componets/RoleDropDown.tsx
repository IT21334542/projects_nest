"use client";
import { Button, Select } from "@radix-ui/themes";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RoleCreate from "./RoleCreate";

interface Role {
  id: string;
  name: string;
  spaceid: string;
}

const RoleDropDown = ({
  spaceid,
  selectedRole,
}: {
  spaceid: String;
  selectedRole: any;
}) => {
  const [_role, _setRole] = useState<Role[]>();
  useEffect(() => {
    axios
      .get("/api/role/" + spaceid)
      .then((value) => {
        _setRole(value.data.data);
      })
      .catch((err) => {
        console.log("error in roleDrop " + err);
      });
  }, [_role]);
  return (
    <Select.Root
      onValueChange={(t) => {
        selectedRole(t);
      }}
    >
      <Select.Trigger />

      <Select.Content>
        <Select.Group>
          <Select.Label>Available Role</Select.Label>
          {_role?.map((role, index) => (
            <Select.Item key={index} value={role.id}>
              {role.name}
            </Select.Item>
          ))}
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <RoleCreate spaceid={spaceid} />
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default RoleDropDown;
