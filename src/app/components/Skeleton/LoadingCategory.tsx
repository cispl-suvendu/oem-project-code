import React from "react";
import { Box } from "@chakra-ui/react";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function LoadingCategory() {
  return (
    <div className="main-con my-5">
      <div className="row">
        <div className="col-sm-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
        <div className="col-sm-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
        <div className="col-sm-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
      </div>
    </div>
  );
}
