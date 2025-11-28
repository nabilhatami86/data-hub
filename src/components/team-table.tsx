"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ProjectTeamModal } from "./team/modal-team";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
}

export interface Project {
  id: number;
  name: string;
  stack: string;
  description: any;
  team: TeamMember[];
}

interface ProjectTeamTableProps {
  data: Project[];
}

// Drawer untuk mengedit detail anggota tim
function TeamMemberDrawer({
  member,
  onUpdate,
}: {
  member: TeamMember;
  onUpdate: (updated: TeamMember) => void;
}) {
  const [teamMember, setTeamMember] = React.useState(member);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-left">
          {member.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{teamMember.name}</DrawerTitle>
          <DrawerDescription>Edit member details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input
              value={teamMember.name}
              onChange={(e) =>
                setTeamMember({ ...teamMember, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Role</Label>
            <Select
              value={teamMember.role}
              onValueChange={(value) =>
                setTeamMember({ ...teamMember, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
                <SelectItem value="QA">QA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DrawerFooter className="flex gap-2">
          <Button onClick={() => onUpdate(teamMember)}>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Menampilkan baris tim per proyek
function TeamMemberRow({
  member,
  onUpdate,
}: {
  member: TeamMember;
  onUpdate: (updated: TeamMember) => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <TeamMemberDrawer member={member} onUpdate={onUpdate} />
      </TableCell>
      <TableCell>{member.role}</TableCell>
    </TableRow>
  );
}

// Tabel utama per project
export function ProjectTeamTable({ data }: ProjectTeamTableProps) {
  const [projects, setProjects] = React.useState<Project[]>(data);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null
  );

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgqD7pfWVfKpUy0ew5Uk9QaEEy45p87Y55ug&s"
                alt={project.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {project.name}
              </h2>
            </div>

            {/* Stack badge */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.stack.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full shadow-sm"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mt-2">
              {project.description}
            </p>

            {/* Tombol View Team */}
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSelectedProject(project)}
            >
              View Team
            </Button>
          </div>
        ))}
      </div>

      {/* Modal Team */}
      {selectedProject && (
        <ProjectTeamModal
          project={selectedProject}
          open={true}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
