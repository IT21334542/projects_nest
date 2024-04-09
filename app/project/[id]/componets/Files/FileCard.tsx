import { Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { FiTrash, FiTrash2, FiXOctagon } from "react-icons/fi";

const FileCard = ({
  name,
  url,
  type,
  id,
  setAdded,
}: {
  name: string;
  url: string;
  type: string;
  id: string;
  setAdded: any;
}) => {
  const [over, setover] = useState<boolean>(false);
  function getSrc(type: string) {
    let view: string | null = "";
    if (type.includes("pdf")) {
      view =
        "https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png";
    } else if (type.includes("text")) {
      view =
        "https://icones.pro/wp-content/uploads/2021/02/icone-de-texte-symbole-png.png";
    } else if (type.includes("image/")) {
      view = null;
    } else {
      view =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Circle-icons-folder.svg/1024px-Circle-icons-folder.svg.png";
    }

    return view;
  }
  return (
    <Flex className=" w-64 rounded-md  h-16 bg-white rounded-l-md">
      <Flex className=" w-full h-full bg-zinc-200 bg-opacity-30 rounded-l-md ">
        <Flex className=" w-3/12 rounded-xl h-full rounded-l-md border">
          <img
            className=" object-cover aspect-video w-full rounded-l-md cursor-pointer "
            src={getSrc(type) ? getSrc(type)! : url}
            onClick={() => {
              window.open(url);
            }}
          />
        </Flex>
        {/* name */}
        <Flex
          className=" w-8/12 text-zinc-700 h-full  bg-slate-400 bg-opacity-35 pl-5"
          align={"center"}
        >
          <Text className=" line-clamp-2">{name}</Text>
        </Flex>
        {/* delete button */}
        <Flex
          className=" w-2/12  h-full bg-slate-400 bg-opacity-35 border-l border-black  hover:bg-zinc-700 hover:bg-opacity-40"
          align={"center"}
          justify={"center"}
          onClick={() => {
            axios
              .patch(
                "/api/files",
                {
                  taskid: id,
                },
                {
                  params: {
                    action: "RvmTask",
                  },
                }
              )
              .then((v) => {
                if (v.status == 200) setAdded(true);
              })
              .catch((e) => {});
          }}
          onMouseOver={() => {
            setover(true);
          }}
          onMouseLeave={() => {
            setover(false);
          }}
        >
          {over && (
            <FiTrash2
              color="#dc2626"
              size={"2em"}
              className=" hover:cursor-pointer"
            />
          )}
          {!over && (
            <FiTrash2
              color="#0f172a"
              size={"2em"}
              className=" hover:cursor-pointer"
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FileCard;
