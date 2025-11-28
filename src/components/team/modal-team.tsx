"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { User } from "lucide-react"; // ikon user

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: number;
  name: string;
  stack: string;
  description: string;
  team: TeamMember[];
}

interface ProjectTeamModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export function ProjectTeamModal({
  project,
  open,
  onClose,
}: ProjectTeamModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg animate-fadeIn p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Team for {project.name}
          </DialogTitle>
          <DialogDescription>
            Here are all members working on this project along with their roles.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-80 mt-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.team.map((member) => (
                <TableRow
                  key={member.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="flex items-center gap-3">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="font-medium text-gray-800">
                      {member.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        member.role === "Project Manager"
                          ? "bg-blue-100 text-blue-800"
                          : member.role === "Developer"
                          ? "bg-green-100 text-green-800"
                          : member.role === "Designer"
                          ? "bg-pink-100 text-pink-800"
                          : member.role === "QA"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {member.role}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
