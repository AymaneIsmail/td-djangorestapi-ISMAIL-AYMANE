import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SelectManager } from "./select";
import { Input } from './ui/input';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useAuth } from '@/context/auth/auth-provider';
import { useCreateProject } from '@/api/client';

export function ModalForm() {
  const [selectedValue, setSelectedValue] = useState("");
  const { token } = useAuth();
  const createProject = useCreateProject();

  if (!token) {
    return window.location.href = '/login';
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const title = (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
    const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;

    const data = {
      title,
      description,
      start_date: formattedDate,
      end_date: formattedDate,
      project_manager: parseInt(selectedValue, 10),
    };

    const res = createProject.mutate({ data, token });
    console.log(res)
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  if (createProject.error) return <div>Error: {createProject.error.message}</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create new project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-2">
            <label>Title</label>
            <Input type="text" id="title" name="title" placeholder="Project title" className="col-span-3" style={{ height: '2.5rem' }} />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label>Description</label>
            <textarea id="description" name="description" placeholder="Project description" className="col-span-3 border border-black rounded-sm" style={{ height: '2.5rem' }} />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label>Researchers</label>
            <SelectManager onSelectionChange={handleSelectChange} />
          </div>
          <DialogFooter>
            <Button type="submit" variant="outline" className="mt-4">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


