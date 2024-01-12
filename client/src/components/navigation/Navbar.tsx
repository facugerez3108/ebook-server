import { Box, Flex, Spacer, Link, Button } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Box bg="gray.400" p={4}>
            <Flex alignItems="center">
                <Link href="/" fontSize="xl" fontWeight="bold">
                    My Website
                </Link>
                <Spacer />
                <Box>
                    <Link href="/about" mr={4}>
                        About
                    </Link>
                    <Link href="/contact" mr={4}>
                        Contact
                    </Link>
                    <Button colorScheme="teal">Sign In</Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;
