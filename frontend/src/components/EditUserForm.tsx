"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditUserFormProps {
  id: string;
  name: string;
  email: string;
}

const EditUserForm = ({ id, name, email }: EditUserFormProps) => {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState(name || "");
  const [newEmail, setNewEmail] = useState(email || "");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (newUser: {name: string, email: string}) => {
      const res = await fetch(`http://localhost:8082/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: newUser.name, email: newUser.email }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      router.refresh();
      router.push("/users");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <div className="flex flex-col gap-3">
      <input
        className="border border-slate-600 px-8 py-2"
        type="text"
        placeholder="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        className="border border-slate-600 px-8 py-2"
        type="text"
        placeholder="Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button
        className="bg-slate-100 font-bold py-3 px-6 w-fit"
        onClick={() => {
          mutation.mutate({ name: newName, email: newEmail })
        }}
      >
        Update User
      </button>
    </div>
  );
};
export default EditUserForm;
