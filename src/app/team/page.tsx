import data from "./data.json";
import { ProjectTeamTable } from "@/components/team-table";

export default function Page() {
  return (
    <div className="@container/main flex flex-1 gap-2 p-4">
      <ProjectTeamTable data={data} />
    </div>
  );
}
