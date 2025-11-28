import data from "./data.json";
import { ProjectTable, Project } from "@/components/project-table";

const projectData = data as Project[];

export default function Page() {
  return (
    <div className="@container/main flex flex-1 gap-2 p-4">
      <ProjectTable data={projectData} />
    </div>
  );
}
