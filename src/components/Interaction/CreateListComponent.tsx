import React, { useState } from "react";
import { createList } from "../../services/Interaction/listService";
import { Button, Input, VStack, useToast } from "@chakra-ui/react";

interface CreateListComponentProps {
  userId: string;
}

const CreateListComponent: React.FC<CreateListComponentProps> = ({
  userId,
}) => {
  const [listName, setListName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await createList({ userId, listName });
      toast({
        title: "List created.",
        description: "Your new list has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setListName("");
    } catch (error) {
      toast({
        title: "Error creating list.",
        description: "There was an issue creating your list. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
      <Input
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        required
      />
      <Button
        type="submit"
        colorScheme="blue"
        isLoading={isLoading}
        loadingText="Creating..."
      >
        Create List
      </Button>
    </VStack>
  );
};

export default CreateListComponent;
