import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
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

  useEffect(() => {
    getTotalUsers();
    getTotalPost();
    topLikes();
    topActiveUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Box>
        <Box w="80%" m="auto" h="auto" mt="20px">
          <Box
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            color="#ffff"
          >
            <Heading textAlign="center" fontSize="20px " fontFamily="cursive">
              Total Number Of Users :
            </Heading>
            <Text
              textAlign="center"
              fontSize="30px"
              fontWeight="bold"
              color="#ffff"
            >
              {countUser.count}
            </Text>
          </Box>
        </Box>
        <Box w="80%" m="auto" h="auto" mt="10px">
          <Box
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            color="#ffff"
            p="5px"
          >
            <Heading textAlign="center" fontSize="20px" fontFamily="cursive">
              Total Number Of Posts :
            </Heading>
            <Text
              textAlign="center"
              fontSize="30px"
              fontWeight="bold"
              color="#ffff"
            >
              {countPost.count}
            </Text>
          </Box>
          <Box
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            gap="20px"
            color="#ffff"
            mt="10px"
            p="5px"
          >
            <Heading textAlign="center" fontSize="20px" fontFamily="cursive">
              Top-Five Most Liked Posts
            </Heading>
            {countLike &&
              countLike.map((post) => {
                return (
                  <Box mt="20px" key={post._id}>
                    <Box border="1px solid white" p="10px" mb="10px">
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
        <Box
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          gap="20px"
          color="#ffff"
          p="5px"
          w="80%"
          m="auto"
          mt="20px"
        >
          <Heading textAlign="center" fontSize="20px" fontFamily="cursive">
            Top-Five Active Users
          </Heading>
          {activeUsers &&
            activeUsers.map((user) => {
              return (
                <Box mt="20px" key={user._id}>
                  <Box border="1px solid white" p="10px" mb="10px">
                    <Text fontSize="20px" fontFamily="cursive">
                      {user.name}
                    </Text>
                    <p>{user.email}</p>
                    <p>Created_at : {user.created_at}</p>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export { Analytics };
