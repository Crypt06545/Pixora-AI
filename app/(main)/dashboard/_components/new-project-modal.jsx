"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlanAccess } from "@/hooks/use-plan-access";

const NewProjectModal = ({ isOpen, onClose }) => {
    const {isFree,canCreateProject} = usePlanAccess()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
          {
            isFree && (
                <Badge variant={'secondary'} className={'bg-slate-700 text-white/70'}>
                    {canCreateProject}/3 projects
                </Badge>
            )
          }
          
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => alert("Project created!")}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
