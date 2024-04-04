import React from "react";
import {
  Avatar,
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment }: any) => {
  const datePosted = new Date(comment.datePosted.seconds * 1000);

  let dateText = "some time ago";
  if (!isNaN(datePosted.getTime())) {
    dateText = formatDistanceToNow(datePosted, { addSuffix: true });
  }

  return (
    <Box borderRadius="lg" borderWidth="1px" p={4} shadow="sm">
      <HStack spacing={4}>
        <Avatar name={comment.userName} src={comment.userAvatar} />
        <VStack align="start">
          <Text fontWeight="bold">{comment.userName}</Text>
          <Text color="gray.500" fontSize="sm">
            {dateText}
          </Text>
        </VStack>
      </HStack>
      <Text mt={2}>{comment.comment}</Text>
      <HStack mt={2}></HStack>
    </Box>
  );
};

export default Comment;
