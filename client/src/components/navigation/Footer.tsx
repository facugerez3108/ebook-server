import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box bg="gray.200" py={4}>
            <Flex justifyContent="center">
                <Text>&copy; 2022 My Website. All rights reserved.</Text>
            </Flex>
        </Box>
    );
};

export default Footer;
