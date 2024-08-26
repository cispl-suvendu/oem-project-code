import React from "react";
import { Box } from "@chakra-ui/react";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function LoadingSearch() {
  return (
    <Box padding="6" boxShadow={0} bg="white">
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
}
