"use client";

import * as React from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IconGripVertical, IconDotsVertical } from "@tabler/icons-react";

export interface Project {
  id: number;
  projectName: string;
  owner: string;
  status: "Not Started" | "In Progress" | "Done";
  budget: number;
  progress: number;
}

interface ProjectTableProps {
  data: Project[];
}

// Drag handle component
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="hover:bg-transparent"
    >
      <IconGripVertical className="size-4" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// Currency formatter to avoid SSR mismatch
function CurrencyCell({ value }: { value: number }) {
  const [formatted, setFormatted] = React.useState<string>("");
  React.useEffect(() => {
    setFormatted(new Intl.NumberFormat("en-US").format(value));
  }, [value]);
  return <>{formatted}</>;
}

// Drawer for editing project
function ProjectDrawer({
  item,
  onUpdate,
}: {
  item: Project;
  onUpdate: (updated: Project) => void;
}) {
  const [project, setProject] = React.useState(item);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-left">
          {item.projectName}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{project.projectName}</DrawerTitle>
          <DrawerDescription>Edit project details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="owner">Owner</Label>
            <Select
              value={project.owner}
              onValueChange={(value) =>
                setProject({ ...project, owner: value })
              }
            >
              <SelectTrigger id="owner">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alice">Alice</SelectItem>
                <SelectItem value="Bob">Bob</SelectItem>
                <SelectItem value="Charlie">Charlie</SelectItem>
                <SelectItem value="Diana">Diana</SelectItem>
                <SelectItem value="Eddie">Eddie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={project.status}
              onValueChange={(value) =>
                setProject({ ...project, status: value as Project["status"] })
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="budget">Budget ($)</Label>
            <Input
              type="number"
              value={project.budget}
              onChange={(e) =>
                setProject({ ...project, budget: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              type="number"
              value={project.progress}
              onChange={(e) =>
                setProject({ ...project, progress: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <DrawerFooter className="flex gap-2">
          <Button onClick={() => onUpdate(project)}>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Draggable row
function DraggableRow({
  row,
  onUpdate,
}: {
  row: Project;
  onUpdate: (updated: Project) => void;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      data-dragging={isDragging}
    >
      <TableCell>
        <DragHandle id={row.id} />
      </TableCell>
      <TableCell>
        <ProjectDrawer item={row} onUpdate={onUpdate} />
      </TableCell>
      <TableCell>{row.owner}</TableCell>
      <TableCell>
        <Badge variant="outline">{row.status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        ${<CurrencyCell value={row.budget} />}
      </TableCell>
      <TableCell>
        <div className="w-24 bg-gray-200 h-3 rounded overflow-hidden">
          <div
            className="bg-green-500 h-3"
            style={{ width: `${row.progress}%` }}
          />
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

// Main ProjectTable
export function ProjectTable({ data }: ProjectTableProps) {
  const [tableData, setTableData] = React.useState<Project[]>(data);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const dataIds = React.useMemo(() => tableData.map((d) => d.id), [tableData]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = dataIds.indexOf(active.id as number);
      const newIndex = dataIds.indexOf(over?.id as number);
      setTableData((d) => arrayMove(d, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Drag</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <DraggableRow
              key={row.id}
              row={row}
              onUpdate={(updated) =>
                setTableData((prev) =>
                  prev.map((d) => (d.id === updated.id ? updated : d))
                )
              }
            />
          ))}
        </TableBody>
      </Table>
    </DndContext>
  );
}
