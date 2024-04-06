import { FbaseApp } from "@/app/componets/FirebaseConfig";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Inset,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FileUpload } from "primereact/fileupload";
import { useEffect, useState } from "react";
import { randomUUID } from "crypto";
import { UniqueComponentId } from "primereact/utils";
import axios from "axios";
import { Files } from "prisma/prisma-client";
import { any } from "zod";

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const FilesCard = ({
  src,
  name,
  type,
}: {
  src: string;
  name: string;
  type: string;
}) => {
  var view = "";

  if (type.includes("pdf")) {
    view =
      "https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png";
  } else if (type.includes("text")) {
    view =
      "https://icones.pro/wp-content/uploads/2021/02/icone-de-texte-symbole-png.png";
  } else if (type.includes("image/")) {
    view = src;
  } else {
    view =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Circle-icons-folder.svg/1024px-Circle-icons-folder.svg.png";
  }

  return (
    <Box maxWidth={"200px"} maxHeight={"250px"}>
      <Card
        variant="ghost"
        className="   bg-[#7C5F46]"
        onClick={() => {
          window.open(src);
        }}
      >
        <Flex direction={"column"} justify={"center"}>
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={view}
              alt="Bold typography"
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: 240,
                backgroundColor: "var(--gray-5)",
              }}
            />
          </Inset>
          <Flex className=" w-full  " justify={"center"}>
            <Text className=" text-white line-clamp-1" weight={"light"}>
              {name}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

interface UploadC {
  name: string;
  type: string;
  url: string;
  spaceId: string;
}

const FilesCompSpace = ({ id }: { id: String }) => {
  const firebaseApp = FbaseApp;
  const Storage = getStorage(firebaseApp);

  const [isUploading, setIsUpload] = useState<boolean>(false);
  const [isUploadingdb, setIsUploaddb] = useState<boolean>(false);
  const [SpaceFiles, setSpaceFiles] = useState<Files[]>();
  const [Farr, setFA] = useState<UploadC[] | null>(null);

  useEffect(() => {
    if (isUploadingdb && Farr) {
      axios
        .post("/api/files", Farr, {
          params: {
            space: id,
          },
        })
        .then((d) => {
          if (d.status == 201) {
            setFA(null);
            setIsUpload(false);
            setIsUploaddb(false);
          }
        })
        .catch((err) => {
          console.error("front error files space:p" + err);
        });
    } else {
    }
  }, [isUploadingdb, Farr]);

  useEffect(() => {
    if (!isUploading) {
      axios
        .get("/api/files", {
          params: {
            space: id,
          },
        })
        .then((value) => {
          console.log("is downloading to ");
          if (value.status == 200) {
            setSpaceFiles(value.data.data);
          }
        })
        .catch((err) => {
          console.error("front error files space:p" + err);
        });
    }
  }, [isUploading]);

  return (
    <Grid justify={"center"}>
      <Flex
        justify={"end"}
        className=" h-14 mb-3  w-full  border-white border-b"
      >
        <Button color="brown" variant="solid">
          {isUploading && <Spinner />}
          <FileUpload
            multiple
            auto
            mode="basic"
            chooseLabel="Upload File"
            onUpload={(event) => {
              setIsUpload(true);
              const filearry: UploadC[] = [];
              const MultiFiles = event.files;
              MultiFiles.map((File, index) => {
                const StorageRef = ref(
                  Storage,
                  "filesofCANVONEST/" + generateRandomString(5)
                );
                uploadBytes(StorageRef, File)
                  .then((res) => {
                    getDownloadURL(res.ref)
                      .then((res) => {
                        const F: UploadC = {
                          name: File.name,
                          type: File.type,
                          url: res,
                          spaceId: id.toString(),
                        };

                        filearry.push(F);
                        if (index == MultiFiles.length - 1) {
                          setFA(filearry);
                          setIsUploaddb(true);
                        }
                      })
                      .catch((err) => {
                        console.error("Download url error " + err);
                      });
                  })
                  .catch((err) => {
                    console.error("Upload Error" + err);
                  });
              });
            }}
          />
        </Button>
      </Flex>
      <Flex as="div">
        {SpaceFiles && (
          <Grid
            columns={"5"}
            gap={"9"}
            p={"5"}
            justify={"center"}
            align={"center"}
            width={"100%"}
          >
            {SpaceFiles.map((fil, index) => {
              return (
                <FilesCard
                  key={index}
                  name={fil.name}
                  src={fil.url}
                  type={fil.type}
                />
              );
            })}
          </Grid>
        )}
      </Flex>
    </Grid>
  );
};

export default FilesCompSpace;
