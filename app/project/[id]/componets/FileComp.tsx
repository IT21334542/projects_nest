"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const FileComp = ({
  spaceid,
  SelectionArray,
}: {
  spaceid: string;
  SelectionArray: any;
}) => {
  const [SpaceFiles, assignSpaceFiles] = useState<any[]>();
  const [FilesSelected, SetSelectiveFiles] = useState<any[] | null>([]);
  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    console.log("object added");
  }, [added]);

  useEffect(() => {
    console.log("1ND @ISER");
    axios
      .get("/api/files", {
        params: {
          space: spaceid,
        },
      })
      .then((res) => {
        if ((res.status = 200)) {
          SetSelectiveFiles([]);
          assignSpaceFiles(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error in fetching space files inside the rtask" + err);
      });
  }, [spaceid]);

  useEffect(() => {
    SelectionArray(FilesSelected);
    console.log("2ND @ISER");
  }, [FilesSelected, SelectionArray]);

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
    <>
      {true && (
        <Flex>
          {SpaceFiles?.map((file: any, index) => {
            return (
              <Flex
                key={index}
                className=" w-36  h-40 border rounded-md my-1 max-h-40"
                direction={"column"}
              >
                <Flex
                  className=" w-full h-3/5"
                  justify={"center"}
                  align={"center"}
                >
                  <img
                    alt=""
                    src={getSrc(file.type) ? getSrc(file.type) : file.url}
                    className=" object-cover w-full aspect-video h-full"
                  />
                </Flex>
                <Flex
                  className=" w-4/5 h-1/5 text-white mx-3   cursor-pointer hover:underline "
                  onClick={() => {
                    window.open(file.url);
                  }}
                >
                  <Text
                    className=" line-clamp-1 "
                    weight={"light"}
                    wrap={"wrap"}
                  >
                    {file.name}
                  </Text>
                </Flex>
                <Flex className=" h-1/5 w-full " justify={"between"}>
                  {!FilesSelected?.includes(file) && (
                    <Button
                      onClick={() => {
                        const ArrNew = FilesSelected;
                        ArrNew!.push(file);
                        setAdded(!added);
                        SetSelectiveFiles(ArrNew);
                      }}
                      color="brown"
                      style={{
                        width: "100%",
                      }}
                    >
                      Add
                    </Button>
                  )}
                  {FilesSelected?.includes(file) && (
                    <Button
                      onClick={() => {
                        const newarray = FilesSelected.filter((f) => {
                          return f != file;
                        });
                        setAdded(!added);
                        SetSelectiveFiles(newarray);
                      }}
                      color="red"
                      style={{
                        width: "100%",
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      )}
    </>
  );
};

export default FileComp;
