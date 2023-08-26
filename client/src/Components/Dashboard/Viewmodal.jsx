import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useDisclosure,Text, useBreadcrumbStyles
} from "@chakra-ui/react";
import axios from "axios"
import { BiShow } from "react-icons/bi";
const Viewmodal = ({ data ,id,userId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("data", data);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
function formatDate(dateTimeString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
}

      const selectedData = data.find((item) => item._id === id);
     
     
     //  const userIds = data.map((item) => item.user_id);
     //  console.log(userIds);

      const userbyid = async (userId) => {
        const res = await axios.get(
          `https://eight6-agency.onrender.com/user/users/${id}`
        );
        const data = await res.json();
        console.log("a", data);
     };
     userbyid()
  return (
    <Box>
      <BiShow
        onClick={onOpen}
        style={{
          width: "23px",
          height: "30px",
          cursor: "pointer",
        }}
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* append data here */}
            {selectedData && (
              <Box key={selectedData._id}>
                <Text>{selectedData.content}</Text>
                <Text>Created At: {formatDate(selectedData.created_at)}</Text>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Viewmodal;
