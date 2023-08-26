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
            gap="20px"
            mb={"15px"}
          >
            <FaUserCircle mt="20px" style={{ width: "80px", height: "80px" }} />
            <Box>
              <Text fontSize="20px" fontWeight="bold">
                {singleUserData.name}
              </Text>
              <Text mt='10px'    fontSize="18px">
                {singleUserData.bio}
              </Text>
            </Box>
          </Box>
          <hr />
          {/* <Box borderTop="1px solid gray" w="90%" m="auto" mt="20px"></Box> */}
        </Box>
      </Box>
    </>
  );
};

export { SingleUser };
