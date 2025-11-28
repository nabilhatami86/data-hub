import { DataTable } from "@/components/data-table";
import data from "../dashboard/data.json";

export default function DashboardPage() {
  return (
    <div className="@container/main flex flex-1 gap-2 p-4">
      <DataTable data={data} />
    </div>
  );
}
