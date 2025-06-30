import { ResourceApiInput } from "@/types/Resource";
import { useMutation } from "@tanstack/react-query";

export const useCreateResourceMutation = () => {
  return useMutation({
    mutationFn: (data: ResourceApiInput) => {
      return fetch("/api/resource", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });
};