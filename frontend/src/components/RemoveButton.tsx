"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RemoveBtn = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://localhost:8082/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        alert("deleted");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleDeleteUser = () => {
    const confirmed = confirm("Are you sure");
    if (confirmed) {
      mutation.mutate(id);
    }
  }

  return (
    <button onClick={handleDeleteUser} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};
export default RemoveBtn;
