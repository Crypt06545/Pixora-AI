"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlanAccess } from "@/hooks/use-plan-access";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Crown, Loader2 } from "lucide-react";

const NewProjectModal = ({ isOpen, onClose, projects, createProject }) => {
  const { isFree, canCreateProject } = usePlanAccess();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");

  const handleClose = () => {
    // setSelectedFile(null);
    // setPreviewUrl(null);
    // setProjectTitle("");
    // setIsUploading(false);
    onClose();
  };


  const handleCreateProject = ()=>{

  }
  const currentProjectCount = projects?.length || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
          {isFree && (
            <Badge variant="secondary" className="bg-slate-700 text-white/70">
              {canCreateProject(currentProjectCount)
                ? `${currentProjectCount}/3 projects`
                : "Limit reached"}
            </Badge>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {isFree && currentProjectCount >= 2 && (
            <Alert className="bg-amber-500/10 border-amber-500/20">
              <Crown className="h-5 w-5 text-amber-400 " />
              <div className="font-semibold text-amber-400 mb-1">
                {currentProjectCount === 2
                  ? "Last Free Project"
                  : "Project Limit Reached"}
              </div>
              <AlertDescription className="text-amber-300/80">
                {currentProjectCount === 2
                  ? "This will be your last free project. Upgrade to Pro for unlimited projects."
                  : "Free plan is limited to 3 projects. Upgrade to Pro to create more."}
              </AlertDescription>
            </Alert>
          )}
          {/* file upload area  */}
        </div>
        <DialogFooter className={"gap-3"}>
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isUploading}
            className="text-white/70 hover:text-white"
          >
            Cancel
          </Button>

          <Button
              onClick={handleCreateProject}
              disabled={!selectedFile || !projectTitle.trim() || isUploading}
              variant="hero"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
