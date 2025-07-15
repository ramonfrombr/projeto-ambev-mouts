"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditUserFormProps {
  id: string;
  name: string;
  email: string;
}

const EditUserForm = ({ id, name, email }: EditUserFormProps) => {
  const [newName, setNewName] = useState(name || "");
  const [newEmail, setNewEmail] = useState(email || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      alert("Both fields are required.");

      return;
    }

    try {
      const res = await fetch(`http://localhost:8082/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
      <button className="bg-slate-100 font-bold py-3 px-6 w-fit" type="submit">
        Update User
      </button>
    </form>
  );
};
export default EditUserForm;
