import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer, IconButton, useColorMode } from '@chakra-ui/react'; // npm i @chakra-ui/react
import { SunIcon, MoonIcon } from '@chakra-ui/icons'; // npm i @chakra-ui/icons

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <h1>The Movies Saga!</h1>
      <Box>
        <RouterLink to="/">
        Home
        </RouterLink>
        {/* Theme toggle button */}
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          boxSize={6}
          variant='outline'
          onClick={toggleColorMode}
        //   {colorMode === 'light' ? 'Dark' : 'Light'}
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        />
      </Box>
    </header>
  );
};

export default Header;
