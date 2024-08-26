import { Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <div className="spinner_overlay">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
}
