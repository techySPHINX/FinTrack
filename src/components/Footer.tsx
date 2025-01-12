/**
 * @fileoverview Footer Component
 * Application footer with project information and social links
 */

"use client";
import { Box, Flex, Text, Button, Icon, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

/**
 * Footer Component
 * 
 * Renders the application footer containing:
 * - Project information
 * - GitHub repository links
 * - Social media links
 * - Branding
 * 
 * Features:
 * - Real-time GitHub star count
 * - Repository fork button
 * - Social media navigation
 * - Responsive layout
 * 
 * @returns React Component
 */

const Footer = () => {
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/0xmetaschool/finance-gpt', {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch star count');
        }
        const data = await response.json();
        setStarCount(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching star count:', error);
        setStarCount(null);
      }
    };

    fetchStarCount();
  }, []);

  return (
    <Box as="footer" borderTop="1px" borderColor="gray.200" boxShadow="sm">
      <Box maxW="7xl" mx="auto" px={4} py={5}>
        <Flex justify="space-between" align="flex-start">
          {/* Left side */}
          <Box>
            <Box
              bg="white.50"
              px={1}
              py={1}
              mb={4}
              maxW="220px"
              borderRadius="md"
            >
              <Text fontSize="xs" color="gray.500">
                open source Project
              </Text>
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              FinTrack
            </Text>
            <HStack spacing={4}>
              <Link href="https://github.com/0xmetaschool/finance-gpt/fork" passHref>
                <Button
                  as="a"
                  bg="black"
                  color="white"
                  size="sm"
                  _hover={{ bg: 'gray.800' }}
                >
                  Fork and Build
                </Button>
              </Link>
              <Box position="relative">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={
                    <Icon viewBox="0 0 16 16" boxSize={4}>
                      <path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                    </Icon>
                  }
                >
                  Star {starCount !== null ? starCount : ''}
                </Button>
                <Box
                  position="absolute"
                  right="-10"
                  top="0"
                  bg="white"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="md"
                  px={2}
                  py={1}
                >
                  <Text fontSize="sm">{starCount}</Text>
                </Box>
              </Box>
            </HStack>
          </Box>

          {/* Right side */}
          <VStack align="flex-end" spacing={4}>
            <HStack spacing={2} pt={8}>
              <Text color="gray.600">MADE WITH</Text>
              <Text fontSize="xl">♥</Text>
              <Text color="gray.600">BY</Text>
              <HStack>
                <img
                  alt="crystal ball"
                  src="https://metaschool.so/_next/static/media/crystalball.074cad21.webp"
                  width={20}
                  height={20}
                />
                <Text fontSize="xl" fontWeight="semibold">
                  techySphinx
                </Text>
              </HStack>
            </HStack>

            {/* Social links */}
            <HStack spacing={4} pt={4}>
              <Text color="gray.600">Follow me on</Text>
              <HStack spacing={3}>
                <Link href="https://www.linkedin.com/in/jagan-kumar-hotta-502a76270/">
                  <Icon viewBox="0 0 24 24" boxSize={5}>
                    <path fill="currentColor" d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </Icon>
                </Link>
              </HStack>
            </HStack>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
