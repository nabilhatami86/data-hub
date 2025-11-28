"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  CheckCircle,
  Hourglass,
  TrendingUp,
  XCircle,
  Clock,
} from "lucide-react";

// --- Business Item Types ---
interface BusinessItem {
  header: string;
  type: string;
  status: "In Process" | "Done" | "Pending Review" | "Lost";
  target: string;
  limit: string;
  reviewer: string;
  position:
    | "Qualification"
    | "Drafting"
    | "Internal Review"
    | "Submission"
    | "N/A";
  readyToSubmit: "Yes" | "No" | "N/A";
  expectedWin: string;
}

// --- Status Pill ---
const StatusPill = ({ status }: { status: BusinessItem["status"] }) => {
  let icon, colorClasses;

  switch (status) {
    case "Done":
      icon = <CheckCircle className="w-4 h-4 text-green-600 mr-1" />;
      colorClasses = "text-green-800 bg-green-50 border border-green-200";
      break;
    case "In Process":
      icon = <Clock className="w-4 h-4 text-amber-600 mr-1 animate-pulse" />;
      colorClasses = "text-amber-800 bg-amber-50 border border-amber-200";
      break;
    case "Pending Review":
      icon = <Hourglass className="w-4 h-4 text-blue-600 mr-1" />;
      colorClasses = "text-blue-800 bg-blue-50 border border-blue-200";
      break;
    case "Lost":
      icon = <XCircle className="w-4 h-4 text-red-600 mr-1" />;
      colorClasses = "text-red-800 bg-red-50 border border-red-200";
      break;
    default:
      icon = <Hourglass className="w-4 h-4 text-gray-500 mr-1" />;
      colorClasses = "text-gray-600 bg-gray-50 border border-gray-200";
  }

  return (
    <div
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${colorClasses}`}
    >
      {icon}
      {status}
    </div>
  );
};

// --- Ready To Submit Pill ---
const ReadyToSubmitPill = ({
  readyToSubmit,
}: {
  readyToSubmit: BusinessItem["readyToSubmit"];
}) => {
  let colorClasses = "bg-gray-400";
  if (readyToSubmit === "Yes") colorClasses = "bg-blue-600";
  else if (readyToSubmit === "No") colorClasses = "bg-red-500";

  return (
    <span
      className={`px-2 py-0.5 rounded-lg text-white text-xs font-semibold shadow-sm ${colorClasses}`}
    >
      {readyToSubmit}
    </span>
  );
};

// --- Lifecycle Table ---
const LifecycleBusinessTable: React.FC<{ data: BusinessItem[] }> = ({
  data,
}) => (
  <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100 bg-white">
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="w-[250px] text-gray-600 font-bold">
            Header
          </TableHead>
          <TableHead className="text-gray-600 font-bold">
            Pipeline Stage
          </TableHead>
          <TableHead className="text-gray-600 font-bold">Status</TableHead>
          <TableHead className="text-gray-600 font-bold">
            Ready to Submit?
          </TableHead>
          <TableHead className="text-gray-600 font-bold">
            Expected Win
          </TableHead>
          <TableHead className="text-gray-600 font-bold">Target</TableHead>
          <TableHead className="text-gray-600 font-bold">Reviewer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className="hover:bg-blue-50/50 transition-colors"
          >
            <TableCell className="font-medium text-gray-800 flex items-center">
              <TrendingUp
                className={`w-4 h-4 mr-2 ${
                  item.status === "Done"
                    ? "text-green-500"
                    : item.status === "Lost"
                    ? "text-red-500"
                    : "text-blue-400"
                }`}
              />
              {item.header}
            </TableCell>
            <TableCell>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border ${
                  item.position === "N/A"
                    ? "bg-gray-100 text-gray-400 border-gray-200"
                    : "bg-indigo-50 text-indigo-700 border-indigo-200"
                }`}
              >
                {item.position}
              </span>
            </TableCell>
            <TableCell>
              <StatusPill status={item.status} />
            </TableCell>
            <TableCell>
              <ReadyToSubmitPill readyToSubmit={item.readyToSubmit} />
            </TableCell>
            <TableCell className="text-sm text-gray-600">
              {item.expectedWin}
            </TableCell>
            <TableCell className="text-sm font-semibold text-green-700">
              {item.target}
            </TableCell>
            <TableCell className="text-sm text-gray-600">
              {item.reviewer}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default LifecycleBusinessTable;
