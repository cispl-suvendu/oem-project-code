import React from "react";
import { Box } from "@chakra-ui/react";
import { SkeletonText } from "@chakra-ui/react";

export default function LoadingQuestions() {
  return (
    <div className="main-con my-5">
      <div className="row">
        <div className="col-sm-4 mb-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
        <div className="col-sm-4 mb-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
        <div className="col-sm-4 mb-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 mb-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
        <div className="col-sm-4 mb-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
        <div className="col-sm-4 mb-4">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
      </div>
    </div>
  );
}
