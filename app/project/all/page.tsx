import {
    Button,
    Card,
    Flex,
    Separator,
    Table,
    Text
} from "@radix-ui/themes";
import { randomInt } from "crypto";
import { FiFolder, FiPlus } from "react-icons/fi";

const SpaceCard = ({ title }: { title: String }) => {
  const colorlist: String[] = [
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-100",
    "bg-pink-500",
  ];
  const rand = randomInt(0, 3);

  return (
    <>
      <Flex direction={"column"}>
        <Card
          className={`w-44 h-36 max-w-44 max-h-36 ${colorlist[rand]}`}
          variant="ghost"
        >
          <FiFolder size={"100%"} />
        </Card>
        <br />
        <Text className=" text-white">{title}</Text>
      </Flex>
    </>
  );
};

const Projectspage = () => {
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
        <Button color="brown">
          <FiPlus color="#ffffff" />
          New Project
        </Button>
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
          <Table.Row className=" border border-white border-r-0 border-l-0 cursor-pointer">
            <Table.RowHeaderCell className=" text-white">
              Danilo Sousa
            </Table.RowHeaderCell>
            <Table.Cell className=" text-white">danilo@example.com</Table.Cell>
            <Table.Cell className=" text-white">Developer</Table.Cell>
            <Table.Cell className=" text-white">Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default Projectspage;
