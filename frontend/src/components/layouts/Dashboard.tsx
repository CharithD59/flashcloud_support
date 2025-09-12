import Header from '../common/Header';
import Footer from '../common/Footer';
import { Card, Badge, Label, Select, Button, Datepicker } from "flowbite-react";
import { HiTicket, HiClock, HiCheckCircle } from "react-icons/hi";
import { useState } from "react";

function Dashboard() {
  // Filters state
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [groupFilter, setGroupFilter] = useState<string>("All");

  // Ticket summary data
  const groupData = [
    { group: "Tech Support", all: 400, pending: 200, resolved: 200 },
    { group: "Product Management", all: 500, pending: 250, resolved: 250 },
    { group: "Software Development", all: 100, pending: 60, resolved: 40 },
  ];

  // Filter data by group (you can add date filtering logic here too)
  const filteredData =
    groupFilter === "All"
      ? groupData
      : groupData.filter((d) => d.group === groupFilter);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">

      
      {/* Main content area that will grow to push footer down */}
      <div className="flex-grow">
        {/* Top summary cards */}
        <main className="p-4 md:ml-64 h-auto pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card className="max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <HiTicket className="w-10 h-10 text-blue-500" />
              <div>
                <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
                  15890
                </h5>
                <p className="text-gray-600 dark:text-gray-400">All Tickets</p>
              </div>
            </div>
            <Badge color="info" className="mt-4">
              Updated just now
            </Badge>
          </Card>

          <Card className="max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <HiClock className="w-10 h-10 text-yellow-500" />
              <div>
                <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
                  2450
                </h5>
                <p className="text-gray-600 dark:text-gray-400">Pending Tickets</p>
              </div>
            </div>
            <Badge color="warning" className="mt-4">
              Needs attention
            </Badge>
          </Card>

          <Card className="max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <HiCheckCircle className="w-10 h-10 text-green-500" />
              <div>
                <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
                  13440
                </h5>
                <p className="text-gray-600 dark:text-gray-400">Resolved Tickets</p>
              </div>
            </div>
            <Badge color="success" className="mt-4">
              Great job!
            </Badge>
          </Card>
        </main>

        <main className="bg-gray-50 dark:bg-gray-800 md:ml-64 p-6 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Filter Controls */}
          </div>

          {/* Ticket summary table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 bg-white dark:bg-gray-900 shadow-sm">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-[#eeeeee] dark:bg-gray-800 rounded-t-xl">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Group</th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">All Tickets</th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Pending Tickets</th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Resolved Tickets</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(({ group, all, pending, resolved }, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <td className="px-6 py-4 font-semibold">{group}</td>
                    <td className="px-6 py-4">{all}</td>
                    <td className="px-6 py-4 text-yellow-600 font-semibold">{pending}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">{resolved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      
    </div>
  );
}

export default Dashboard;