// This header is not used

import React from 'react';
import { Box, Flex, Heading, Spacer, IconButton, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={6}
      bg='brand.500'
      color='black'
    >
      <Flex align='center' mr={5}>
        {/* <Heading as='h1' size='lg' letterSpacing={'tighter'}>
          The Movie Gallery
        </Heading> */}
      </Flex>

      <Spacer />

      <Box display='flex' alignItems='center'>
        <RouterLink to='/' style={{ marginRight: '16px', color: 'black', textDecoration: 'none' }}>
          Home
        </RouterLink>
        {/* <RouterLink
          to='/add'
          style={{ marginRight: '16px', color: 'black', textDecoration: 'none' }}
        >
          Add Movie
        </RouterLink> */}

        {/* Theme Toggle Button */}
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          colorScheme='brand'
          variant='outline'
          size='sm'
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          mr={4}
        />
      </Box>
    </Flex>
  );
};

export default Header;
