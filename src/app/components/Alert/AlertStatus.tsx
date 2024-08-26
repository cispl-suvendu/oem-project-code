import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

export default function AlertStatus({ message, status }) {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
