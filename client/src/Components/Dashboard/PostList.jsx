import React, { useEffect, useState } from "react";
import {
  Box,
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
  Textarea,
  Heading,
  useToast,Image, Flex
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "../Redux/postSlice";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar";
import Viewmodal from "./Viewmodal";
// import { BiShow } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const PostList = () => {
  const [data1, setData1] = useState({ content: "" });
  const [userId, setUserId] = useState("");
  const toast = useToast();
  let dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let data = useSelector((state) => state.post.allPost);
  let loading = useSelector((state) => state.post.isLoading);
  // let error = useSelector((state) => state.post.isError);

  const onModelOpen = (id, content) => {
    onOpen();
    setUserId(id);
    setData1({ ...data1, content });
  };

  const likePost = async (id) => {
    try {
      const response = await axios.put(
        `https://eight6-agency.onrender.com/posts/${id}/like`,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };
  const dislikePost = async (id) => {
    try {
      const response = await axios.put(
        `https://eight6-agency.onrender.com/posts/${id}/unlike`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `https://eight6-agency.onrender.com/posts/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "Post deleted successfully",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (id) => {
    try {
      const response = await axios.put(
        `https://eight6-agency.onrender.com/posts/${id}`,
        data1,
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

      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };

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
  
  
 
  
  useEffect(() => {
    dispatch(fetchAllPost());
   
  }, []);

  return (
    <>
      <Navbar />
      {loading && (
        <Box>
          <Image
            m="auto"
            w="100px"
            mt="5px"
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
          />
        </Box>
      )}
      <Box h="100vh" mt="50px">
        {data && data.length > 0 ? (
          <Box>
            {data.map((post) => (
              <Box
                key={post._id}
                // bgGradient="linear(to-l, #7928CA, #FF0080)"

                boxShadow={
                  "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
                }
                color="black.400"
                m="auto"
                w={{ base: "90%", sm: "90%", md: "45%", xl: "45%" }}
                p="10px 10px 0px 10px"
                mb="20px"
                borderRadius="5px"
              >
                {/* <p>{post.created_at}</p> */}
                <Text
                  fontWeight="400"
                  fontSize="20px"
                  // fontFamily="cursive"
                  textAlign="center"
                >
                  {post.content}
                </Text>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="5px"
                  p="10px 0px 5px 5px"
                >
                  <Box display="flex" alignItems="center" gap="5px">
                    <AiFillLike
                      onClick={() => likePost(post._id)}
                      style={{
                        width: "23px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />

                    <p>{post.likes} likes</p>
                    <AiFillDislike
                      onClick={() => dislikePost(post._id)}
                      style={{
                        width: "23px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <Text color={"gray"} fontSize={"13px"}>{formatDate(post.created_at)}</Text>{" "}
                  <Box display="flex" gap="10px">
                    <Viewmodal
                      data={data}
                      id={post._id}
                      userid={post.user_id}
                    />

                    <AiFillEdit
                      onClick={() => onModelOpen(post._id, post.content)}
                      style={{
                        width: "23px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />

                    <AiFillDelete
                      onClick={() => deletePost(post._id)}
                      style={{
                        width: "23px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            <Image
              m="auto"
              w="50%"
              src="https://cdn.dribbble.com/users/2149912/screenshots/7861800/artboard.png"
              alt="no data img"
            />
          </Box>
        )}
      </Box>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Update Your Post</ModalHeader>
          <hr style={{ marginTop: "0px" }} />
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Typing..."
              value={data1.content}
              onChange={(e) => setData1({ ...data1, content: e.target.value })}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr="10px"
              onClick={onClose}
              colorScheme="red"
              variant="solid"
            >
              CLOSE
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => updatePost(userId)}
            >
              UPDATE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { PostList };
