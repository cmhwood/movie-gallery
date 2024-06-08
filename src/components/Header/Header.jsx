import React from 'react';
import { Box, Button, Flex, Heading, Spacer, IconButton, useColorMode } from '@chakra-ui/react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <h1>The Movies Saga!</h1>
      <Box>
        <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
      </Box>
    </header>
  );
};

export default Header;
