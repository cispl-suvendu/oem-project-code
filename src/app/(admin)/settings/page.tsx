"use client";
import React, { useState } from "react";
import UserModal from "../../components/Modals/UserModal";
import { Button } from "@chakra-ui/react";
import Settings from "../../components/Settings/settings";

export default function SettingPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Settings/>
      {/* <UserModal {...{ open, setOpen }} />
      <Button colorScheme="blue" onClick={() => setOpen(true)}>
        Create User
      </Button> */}
    </div>
  );
}
 
