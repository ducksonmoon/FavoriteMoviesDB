import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

export const FormField = ({ label, type, ...props }: any) =>
  type === "textarea" ? (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea placeholder={`Enter ${label.toLowerCase()}...`} {...props} />
    </FormControl>
  ) : (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        placeholder={`Select ${label.toLowerCase()}`}
        {...props}
      />
    </FormControl>
  );
