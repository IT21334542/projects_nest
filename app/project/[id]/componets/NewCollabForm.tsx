"use client";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Text,
  Select,
  Spinner,
  Skeleton,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import InviteTeamCollabrators from "./InviteTeamCollabrators";
import { FiCoffee } from "react-icons/fi";
import axios from "axios";

const ColleguesSelect = ({
  prjid,
  colbset,
}: {
  prjid: string;
  colbset: any;
}) => {
  const [_listColle, _setColle] = useState<any>();

  useEffect(() => {
    axios
      .get("/api/projects/" + prjid)
      .then((value) => {
        if ((value.status = 200)) _setColle(value.data.data);
      })
      .catch((err) => {
        console.error("Error in Front B - Col:p : +" + err);
      });
  }, [prjid]);
  return (
    <>
      {_listColle && (
        <Select.Root
          onValueChange={(e) => {
            colbset(e);
          }}
        >
          <Select.Trigger placeholder="Select Collegue" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Available</Select.Label>
              {_listColle.spaceid.colleague.map((pr: any, index: number) => {
                return (
                  <Select.Item key={index} value={pr.userID.id}>
                    {pr.userID.name}
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      {!_listColle && (
        <Select.Root defaultValue="off">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="off">
                <Flex gap={"3"}>
                  <Spinner />
                  <Text>
                    <Skeleton loading={true}>skdsfsdfkkff</Skeleton>
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

const RoleSelect = ({ prid, rolSet }: { prid: string; rolSet: any }) => {
  const [_listRole, _setListRole] = useState<any>();
  useEffect(() => {
    axios
      .get("/api/projectRole", {
        params: {
          project: prid,
        },
      })
      .then((value) => {
        if ((value.status = 200)) _setListRole(value.data.data);
      })
      .catch((err) => {
        console.error("Error in Front B - Col:p : +" + err);
      });
  }, [prid]);

  return (
    <>
      {_listRole && (
        <Select.Root
          onValueChange={(e) => {
            rolSet(e);
          }}
        >
          <Select.Trigger placeholder="Select a role" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Available</Select.Label>
              {_listRole.map((pr: any, index: number) => {
                return (
                  <Select.Item key={index} value={pr.id}>
                    {pr.name}
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      {!_listRole && (
        <Select.Root defaultValue="off">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="off">
                <Flex gap={"3"}>
                  <Spinner />
                  <Text>
                    <Skeleton loading={true}>skdsfsdfkkff</Skeleton>
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

const NewCollabForm = ({ prjId }: { prjId: string }) => {
  const [_CollabaratorSelected, _setCollabrator] = useState<any | null>();
  const [_RoleSelected, _setRole] = useState<any | null>();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="violet">
          <FiCoffee size={"1.2em"} />
          <Text>Invite collaborators</Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add New collaborators</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Work together grow together
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              collaborator
            </Text>
          </label>
          <ColleguesSelect prjid={prjId} colbset={_setCollabrator} />
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role in Project
            </Text>
            <RoleSelect prid={prjId} rolSet={_setRole} />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={() => {
                axios
                  .post(
                    "/api/collab",
                    {},
                    {
                      params: {
                        project: prjId,
                        user: _CollabaratorSelected,
                        projectrole: _RoleSelected,
                      },
                    }
                  )
                  .then((value) => {})
                  .catch((err) => {
                    console.error("Error front creation-p" + err);
                  });
              }}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewCollabForm;
