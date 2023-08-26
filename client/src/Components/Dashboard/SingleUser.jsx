import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const SingleUser = () => {
  const [singleUserData, setSingleUserData] = useState({});
  let { id } = useParams();

  const userData = async () => {
    try {
      let res = await axios.get(
        `https://eight6-agency.onrender.com/users/${id}`
      );
      setSingleUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <Box h="100vh">
        <Box w="80%" border="1px solid teal" m="auto" h="550px" mt="25px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="100px"
          >
            <FaUserCircle style={{ width: "120px", height: "120px" }} />
            <Text fontFamily="cursive" fontSize="20px" fontWeight="bold">
              {singleUserData.name}
            </Text>
          </Box>

          <Box display="flex" justifyContent="center" gap="20px" ml="250px">
            <Text fontWeight="500" fontFamily="cursive" fontSize="15px">
              Posts
            </Text>
            <Text fontWeight="500 " fontFamily="cursive" fontSize="15px">
              0 followers
            </Text>
            <Text fontWeight="500" fontFamily="cursive" fontSize="15px">
              0 following
            </Text>
          </Box>

          <Box mt="10px" ml="51%">
            <Text fontWeight="600" fontFamily="cursive" fontSize="20px">
              {singleUserData.bio}
            </Text>
          </Box>
          <Box borderTop="1px solid gray" w="90%" m="auto" mt="20px"></Box>
          {/* <Box>all post</Box> */}
        </Box>
      </Box>
    </>
  );
};

export { SingleUser };
