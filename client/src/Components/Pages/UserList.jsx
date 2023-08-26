import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormLabel,
  Textarea,
  Select,
  useToast,
 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,

} from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import { BiShow } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserList = () => {
  const toast = useToast();
  let dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userId, setUserId] = useState("");
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const onModelOpen = (id, name, email, bio) => {
    onOpen();
    setUserId(id);
    setUpdatedData({ ...updatedData, name, email, bio });
  };

  const updateUserData = async (id) => {
    try {
      const response = await axios.put(
        `https://eight6-agency.onrender.com/users/${id}`,
        updatedData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: response.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      getallUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const getallUsers = async () => {
    try {
      let res = await axios.get("https://eight6-agency.onrender.com/users");
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://eight6-agency.onrender.com/users/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "User deleted successfully",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      getallUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getallUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Box>
        <Heading
          textAlign="center"
          m="20px"
          fontSize="30px"
          fontFamily="cursive"
        >
          List Of Users
        </Heading>

        <Box>
          <Table m="auto" w="80%" variant="striped" colorScheme="purple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData &&
                userData.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Flex
                        w="40%"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        {" "}
                        <Link to={`/singleuser/${user._id}`}>
                          <Box
                            as="span"
                            display="inline-block"
                            _hover={{ color: "green", transform: "scale(1.1)" }}
                          >
                            <BiShow
                              style={{
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                              }}
                            />
                          </Box>
                        </Link>
                        <AiFillEdit
                          onClick={() =>
                            onModelOpen(
                              user._id,
                              user.name,
                              user.email,
                              user.bio
                            )
                          }
                          color="green"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                        />
                        <Box
                          as="span"
                          display="inline-block"
                          _hover={{ color: "red", transform: "scale(1.1)" }}
                        >
                          <AiFillDelete
                            onClick={() => deleteUser(user._id)}
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                            }}
                            // color="red"
                          />
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Update Your Details</ModalHeader>
          <hr style={{ marginTop: "0px" }} />
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              value={updatedData.name}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
            />
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={updatedData.email}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, email: e.target.value })
              }
            />
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Bio"
              value={updatedData.bio}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, bio: e.target.value })
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr="10px"
              colorScheme="red"
              variant="solid"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => updateUserData(userId)}
            >
              UPDATE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { UserList };
