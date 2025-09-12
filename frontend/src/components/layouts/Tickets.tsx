import React, { useState } from 'react';
import { Avatar, Badge, Pagination } from 'flowbite-react';
import { User, Building2 } from "lucide-react";
import { Link } from 'react-router-dom';

const mockTickets = Array.from({ length: 90 }, (_, index) => ({
id: 15000 + index,
subject: `Ticket Subject Explain`,
status: 'New',
author: 'Charith Dilanka',
company: 'iPhonik',
daysAgo: 7,
overdueBy: 4,
priority: 'Low',
assignee: 'Tech Support',
state: 'Open',
initial: 'C',
}));

const ITEMS_PER_PAGE = 6;

const Tickets: React.FC = () => {
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(mockTickets.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const currentTickets = mockTickets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

return (
<div className="min-h-screen bg-gray-100 dark:bg-gray-900">

  <main className="p-4 md:ml-64 h-auto pt-20 space-y-4">
    {currentTickets.map((ticket) => (
      <div
        key={ticket.id}
        className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-semibold text-white">
            <Avatar rounded placeholderInitials={ticket.initial} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge color="success">{ticket.status}</Badge>
              <p className="font-semibold text-gray-900 dark:text-white">
                {ticket.subject} <span className="text-gray-500">#{ticket.id}</span>
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {ticket.author}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                Company: {ticket.company}
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created: {ticket.daysAgo} days ago • Overdue by: {ticket.overdueBy} days
            </p>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <Badge color="success">{ticket.priority}</Badge>
            <p className="text-sm text-gray-500 dark:text-gray-400">👤 {ticket.assignee}</p>
            <Link to={`/ticket/${ticket.id}`}>
              <Badge color="info" className="cursor-pointer">{ticket.state}</Badge>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </main>

  <div className="p-4 md:ml-64 flex justify-end mb-6">
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page)=> setCurrentPage(page)}
      />
  </div>

</div>

);
};

export default Tickets;