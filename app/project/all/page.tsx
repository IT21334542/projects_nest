"use client";
import { Button, Flex, Separator, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLayout, FiPlus } from "react-icons/fi";

interface Project {
  id: String;
  name: String;
  OwnerId: String;
  Members: String;
  spaceId: String;
}

const Projectspage = () => {
  const router = useRouter();
  const [_ProjectsList, _SetProjectsList] = useState<Project[]>([
    {
      id: "",
      name: "",
      OwnerId: "",
      Members: "",
      spaceId: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        _SetProjectsList(response.data.data);
      })
      .catch((err) => {
        console.log("LOg.D Error in fetching-Frontend" + err);
      });
  }, []);

  return (
    <Flex
      className=" bg-[#1E1F21] w-full h-full py-4 px-5"
      direction={"column"}
    >
      <Text className=" text-white text-3xl" weight={"medium"}>
        Projects
      </Text>
      <Separator
        mt={"2"}
        size={"4"}
        style={{
          backgroundColor: "#ffffff",
          height: "0.1%",
          opacity: 0.6,
        }}
      />
      <Flex justify={"end"} m={"2"}>
        <Link href={"/project/create"}>
          <Button color="brown">
            <FiPlus color="#ffffff" />
            New Project
          </Button>
        </Link>
      </Flex>

      <Table.Root size={"2"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className=" text-white">
              Name
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-white">
              Owner
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-white">
              Members
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" text-white">
              WorkSpace
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_ProjectsList.map((project, index) => {
            return (
              <Table.Row
                key={index}
                className=" border border-white border-r-0 border-l-0 cursor-pointer"
                onClick={() => {
                  router.push("/project/" + project.id);
                }}
              >
                <Table.RowHeaderCell className=" text-white">
                  <Flex align={"end"} gap={"2"}>
                    <FiLayout color="#ffffff" size={"2em"} />
                    {project.name}
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className=" text-white">
                  {project.OwnerId}
                </Table.Cell>
                <Table.Cell className=" text-white">
                  {project.Members}
                </Table.Cell>
                <Table.Cell className=" text-white">
                  {project.spaceId}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default Projectspage;
