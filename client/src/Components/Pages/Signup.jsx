import React from "react";
import {
  Box,
  Text,
  Heading,
  FormLabel,
  Input,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import { SiAdobe } from "react-icons/si";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import agency from "../../assets/agency.png";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
  });
  const isPasswordValid = userData.password.length >= 8;

  const toast = useToast();
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser(userData))
      .then((res) => {
        // alert(res.response);
        toast({
          title: res.response,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        if (res.response === "user created successfully") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      <Box
        h="100vh"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        display={{ base: "inline", sm: "flex", md: "flex", xl: "flex" }}
        justifyContent="space-around"
      >
        <Box
          h="100px"
          mt="20%"
          w={{ base: "35%", sm: "30%", md: "50%", xl: "35%" }}
        >
          <Box display="flex" alignItems="center">
            <Image w="50px" src={agency} />
            <Text ml="10px" fontWeight="bold" fontSize="30px" color="#fff">
              Agency
            </Text>
          </Box>
          <Text color="#ffff" fontSize="20px" fontWeight="500">
            Sign in or create an account
          </Text>
        </Box>

        {/* Signup Box */}
        <Box
          w={{ base: "90%", sm: "50%", md: "50%", xl: "35%" }}
          h="600px"
          mt="30px"
          background="#ffff"
          p="25px"
          borderRadius="5px"
        >
          <Heading textAlign="center" m="20px" fontFamily="cursive">
            Signup here
          </Heading>
          <form onSubmit={handleSignup}>
            <FormLabel fontFamily="cursive">Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              variant="flushed"
              required
              value={userData.name}
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
            />
            <FormLabel mt="10px" fontFamily="cursive">
              Email{" "}
            </FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              variant="flushed"
              required
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
            <FormLabel mt="10px" fontFamily="cursive">
              Bio{" "}
            </FormLabel>
            <Input
              type="text"
              placeholder="Optional"
              variant="flushed"
              required
              value={userData.bio}
              onChange={(e) => {
                setUserData({ ...userData, bio: e.target.value });
              }}
            />
            <FormLabel mt="10px" fontFamily="cursive">
              Password{" "}
            </FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              variant="flushed"
              required
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
            {isPasswordValid ? (
              <Text color="green">Password is valid!</Text>
            ) : (
              <Text color="red">
                Password must be at least 8 characters long.
              </Text>
            )}
            <Button
              type="submit"
              w="100%"
              m="auto"
              mt="40px"
              borderRadius="20px"
              fontWeight="bold"
              // background="#1473e6"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              color="#ffff"
              _hover="none"
            >
              <button disabled={!isPasswordValid}>SIGN IN</button> 
            </Button>

            <p
              style={{
                textAlign: "center",
                margin: "20px",
                fontFamily: "cursive",
              }}
            >
              Already a user?{" "}
              <Link to="/login">
                <span
                  style={{
                    fontWeight: "bold",
                    fontFamily: "cursive",
                    cursor: "pointer",
                    color: "blue",
                  }}
                >
                  Log in
                </span>
              </Link>
            </p>
          </form>
        </Box>
      </Box>
    </>
  );
};

export { Signup };
