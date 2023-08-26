import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
const Analytics = () => {
  const [countUser, setCountUser] = useState(0);
  const [countPost, setCountPost] = useState(0);
  const [countLike, setCountLike] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const getTotalUsers = async () => {
    try {
      let res = await axios.get(
        "https://eight6-agency.onrender.com/users/analytics/users"
      );
      setCountUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalPost = async () => {
    try {
      let res = await axios.get(
        "https://eight6-agency.onrender.com/posts/analytics/posts"
      );
      setCountPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const topLikes = async () => {
    try {
      let res = await axios.get(
        "https://eight6-agency.onrender.com/posts/analytics/posts/top-liked"
      );
      setCountLike(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const topActiveUsers = async () => {
    try {
      let res = await axios.get(
        "https://eight6-agency.onrender.com/users/analytics/users/top-active"
      );
      setActiveUsers(res.data);
    } catch (err) {
      console.log(err);
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
    getTotalUsers();
    getTotalPost();
    topLikes();
    topActiveUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Box w="90%" m="auto" mt="20px">
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontWeight={"600"}> Total Users : {countUser.count}</Text>
          <Text fontWeight={"600"}> Total Posts : {countPost.count}</Text>
        </Flex>

        <Flex
          gap="10px"
          padding="10px"
          borderTop="2px solid  rgb(184, 184, 284)"
        >
          <Box
            padding="10px"
            w="50%"
            borderRadius={"5px"}
            // border="1px solid  rgb(184, 184, 184)"
            boxShadow={
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
            }
          >
            <Heading textAlign="center" fontSize="20px" fontFamily="cursive">
              Top-Five Active Users
            </Heading>
            {activeUsers &&
              activeUsers.map((user) => {
                return (
                  <Box mt="10px" key={user._id}>
                    <Box
                      border="1px solid  rgb(184, 184, 184)"
                      borderRadius={"10px"}
                      p="10px"
                      mb="10px"
                    >
                      <Text fontSize="20px" fontFamily="cursive">
                        {user.name}
                      </Text>
                      <p>{user.email}</p>
                      <Text ml={"64%"} mt="10px" color="gray" fontSize={"14px"}>
                        {formatDate(user.created_at)}
                      </Text>{" "}
                    </Box>
                  </Box>
                );
              })}
          </Box>
          <Box
            w="50%"
            padding="10px"
            borderRadius={"5px"}
            boxShadow={
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
            }
          >
            <Box gap="10px" p="5px">
              <Heading textAlign="center" fontSize="20px" fontFamily="cursive">
                Top-Five Most Liked Posts
              </Heading>
              {countLike &&
                countLike.map((post) => {
                  return (
                    <Box mt="10px" key={post._id}>
                      <Box
                        border="1px solid  rgb(184, 184, 184)"
                        p="10px"
                        mb="10px"
                        borderRadius={"5px"}
                      >
                        <Text fontSize="20px" fontFamily="cursive">
                          {post.content}
                        </Text>
                        <p>Likes : {post.likes}</p>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export { Analytics };
