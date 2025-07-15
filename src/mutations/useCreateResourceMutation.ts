import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ResourceApiInput } from "@/types/Resource";

export const useCreateResourceMutation = (
  options?: UseMutationOptions<Response, unknown, ResourceApiInput>
) => {
  return useMutation<Response, unknown, ResourceApiInput>({
    mutationFn: (data: ResourceApiInput) => {
      return fetch("/api/resource", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    ...options,
  });
};