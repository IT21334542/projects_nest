import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Button,
  Preview,
  Link,
  Tailwind,
  Section,
  Column,
  Row,
  Img,
  Heading,
} from "@react-email/components";

const WelcomeTemplate = ({
  email,
  spacename,
  ownername,
  role,
}: {
  email: string;
  spacename: string;
  ownername: string;
  role: string;
}) => {
  return (
    <Html>
      <Preview>You are Invited to Join Canvonest!</Preview>
      <Tailwind>
        <Body className=" bg-white m-3">
          <Section className=" flex">
            <Img
              src="https://convonest.wie-solutions.co.uk/icon.png"
              width={"10%"}
              alt="logo"
            />
            <Text className="text-black text-[24px] font-normal text-center p-0 font-serif">
              You are invited to the space {spacename} in{" "}
              <strong>Canvonest</strong>
            </Text>
          </Section>
          <Text className="text-black text-[16px] leading-[24px]">
            hello {email},
          </Text>
          <Text className="text-black text-[14px] ">
            You are invited to the space <strong>{spacename}</strong> of{" "}
            {ownername} to the role of {role}. continue by clicking the button
            below
          </Text>{" "}
          <Button
            href="https://convonest.wie-solutions.co.uk/"
            className=" bg-violet-500 rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
          >
            Accept Invite
          </Button>
          <Text>or copy and past the following link to your browser</Text>
          <Section className=" border border-orange-600 bg-[#1E1F21] text-white h-14 flex items-center justify-center">
            https://convonest.wie-solutions.co.uk/
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
