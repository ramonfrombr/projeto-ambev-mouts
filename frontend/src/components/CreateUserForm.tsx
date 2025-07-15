"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateUserForm = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (newUser: {name: string, email: string}) => {
      const res = await fetch(`http://localhost:8082/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        throw new Error("Failed to create");
      }

      router.refresh();
      router.push("/users");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <>
      {mutation.isPending ? (
          <>Adding user...</>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              className="border border-slate-600 px-8 py-2"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-slate-600 px-8 py-2"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-slate-100 font-bold py-3 px-6 w-fit"
              onClick={() => {
                mutation.mutate({ name: name, email: email })
              }}
            >
              Create User
            </button>
          </div>
        )
      }
    </>
  );
};
export default CreateUserForm;
