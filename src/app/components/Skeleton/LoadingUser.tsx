import React from "react";
import { Box } from "@chakra-ui/react";
import { SkeletonText } from "@chakra-ui/react";

export default function LoadingUser() {
  return (
    <div className="main-con">
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
      <div className="my-2">
        <Box padding="2" bg="white">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>
      </div>
    </div>
  );
}
