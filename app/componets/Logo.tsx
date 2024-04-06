import React from "react";
import Image from "next/image";
import { string } from "zod";

const Logo = ({
  w,
  h,
}: {
  w: number | `${number}`;
  h: number | number | `${number}`;
}) => {
  return (
    <Image
      src={"/logo.png"}
      alt="Logo of the applixation"
      width={w}
      height={h}
    />
  );
};

export default Logo;
