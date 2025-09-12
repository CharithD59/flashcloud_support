import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  FaReply,
  FaShareSquare,
  FaTimes,
  FaTrash,
  FaArrowsAltH,
  FaChevronDown,
  FaPaperclip,
} from 'react-icons/fa';

interface CcRecipients {
  akila: boolean;
  machiavarathnayake: boolean;
  nuwanj: boolean;
  rishui: boolean;
}

interface Email {
  from: string;
  to: string;
  cc: string;
  subject: string;
  date: string;
  body: React.ReactNode;
}

interface TicketData {
  id: string | undefined;
  subject: string;
  status: string;
  priority: string;
  group: string;
  assignee: string;
  reportedBy: string;
  reportedDate: string;
  resolutionDueDate: string;
  statusOptions: string[];
  priorityOptions: string[];
  groupOptions: string[];
  assigneeOptions: string[];
  emails: Email[];
}

const ccOptions: { key: keyof CcRecipients; label: string }[] = [
  { key: 'akila', label: 'akila@iphonik.com' },
  { key: 'machiavarathnayake', label: 'machiavarathnayake@sampath.lk' },
  { key: 'nuwanj', label: 'nuwanj@sampath.lk' },
  { key: 'rishui', label: 'rishui.hettiarachchi@dialog.lk' },
];

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [ccRecipients, setCcRecipients] = useState<CcRecipients>({
    akila: false,
    machiavarathnayake: true,
    nuwanj: true,
    rishui: true,
  });
  const [isForwarding, setIsForwarding] = useState(false);
  const [forwardContent, setForwardContent] = useState('');
  const [forwardRecipients, setForwardRecipients] = useState({
    to: '',
    cc: '',
  });

  // Dummy data with proper typing
  const ticketData: TicketData = {
    id: id,
    subject: "Re: Report in Accuracy in Iphonik system",
    status: "Open",
    priority: "Low",
    group: "Tech Support",
    assignee: "Charith Dilanka",
    reportedBy: "IT Service Desk",
    reportedDate: "10 days ago (Mon, 3 Jun 2024 at 11:50 AM)",
    resolutionDueDate: "Thu, Jun 12, 2025 03:55 PM",
    statusOptions: ["Open", "Pending", "Resolved", "Closed"],
    priorityOptions: ["Low", "Medium", "High", "Critical"],
    groupOptions: ["Tech Support", "Development", "QA", "Operations"],
    assigneeOptions: ["Charith Dilanka", "Adbheesha Fernando", "Rajendran Sathiyaseelan", "Lishara Senanayake"],
    emails: [
      {
        from: "IT Service Desk <support@unionassurance.com>",
        to: "IT Service Desk <itservicedesk@unionassurance.com>",
        cc: "lishara@unionassurance.com, ranga@unionassurance.com, malaka@unionassurance.com, +4 more", // Example of multiple CCs
        subject: "Re: Report in Accuracy in Iphonik system",
        date: "Mon, Jun 3, 2024 at 11:50 AM", // Date from image
        body: (
          <>
            <p>Hi Team,</p>
            <p className="mt-2">Please see your report to resolve this issue.</p>
            <p className="mt-4">Thank you,</p>
            <p><strong>IT Service Desk</strong><br />
              <strong>Union Assurance</strong><br />
              Information Technology</p>
            <p className="mt-4"><strong>Union Assurance PLC</strong><br />
              No 200, Union Place Road<br />
              Colombo 03, Sri Lanka</p>
            <p>Direct: 011 2990 008, Contact IT Service Desk.<br />
              Mobile: 074 234 5629</p>
            {/* Using a placeholder for the logo */}
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Union Assurance Logo" className="h-12 mt-4" />
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">www.unionassurance.com</p>
            <div className="flex space-x-2 mt-2">
              {/* Social icons placeholders */}
              <span className="text-blue-600 dark:text-blue-400">FB</span>
              <span className="text-blue-400">TW</span>
              <span className="text-blue-800">LI</span>
            </div>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">John keells Group - Confidential</p>
          </>
        ),
      },
      {
        from: "Adbheesha Fernando <adbheeshaf@unionassurance.com>",
        to: "IT Service Desk <itservicedesk@unionassurance.com>",
        cc: "Lishara Senanayake <lishara@unionassurance.com>, Ranga Fonseka <ranga@unionassurance.com>, Malaka Meliwarachchi <malaka@unionassurance.com>, Virjiniya <virjiniya@unionassurance.com>",
        subject: "Re: Report in Accuracy in Iphonik system",
        date: "Monday, June 2, 2025 11:22 AM",
        body: (
          <>
            <p>@IT Service Desk</p>
            <p className="mt-2">Please escalate to Iphonik team and followup on their response.</p>
            <p className="mt-4">Sincerely,</p>
            <p><strong>Adbheesha Fernando</strong><br />
              Senior Executive - IT<br />
              Information Technology</p>
            <p className="mt-4"><strong>UNION ASSURANCE PLC</strong><br />
              No 200, Union Place Road<br />
              Colombo 03, Sri Lanka</p>
            <p>011 2990 008 (IT Service Desk)<br />
              074 234 5629</p>
            {/* Using a placeholder for the logo */}
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Union Assurance Logo" className="h-12 mt-4" />
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Book time to meet with me</p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">John keells Group - Confidential</p>
          </>
        ),
      },
      {
        from: "Rajendran Sathiyaseelan <rajendran@unionassurance.com>",
        to: "Adbheesha Fernando <adbheeshaf@unionassurance.com>",
        cc: "Lishara Senanayake <lishara@unionassurance.com>, Ranga Fonseka <ranga@unionassurance.com>, Malaka Meliwarachchi <malaka@unionassurance.com>, Virjiniya <virjiniya@unionassurance.com>",
        subject: "Report in Accuracy in Iphonik system",
        date: "Monday, June 02, 2025 10:38 AM",
        body: (
          <>
            <p>Hi Adbheesha and Nayon,</p>
            <p className="mt-2">Please note that I have identified an inaccuracy in the iphonik reports. I ran a <strong>Call Summary Report</strong> for the period from May 1st, 7:30 AM to June 1st, 7:30 AM which shows the <strong>answered call count as 0</strong> for 011 2200 700. However, when checking the <strong>Call Details Report</strong> for the same period and number, the <strong>answered call count is 4</strong>.</p>
            <p className="mt-2">Could you please look into this discrepancy and provide a solution? It is important for us to have accurate reporting for our operations.</p>
            <p className="mt-4">Thank you.</p>
            <p className="mt-4">Best regards,</p>
            <p><strong>Rajendran Sathiyaseelan</strong><br />
              Senior Executive - IT<br />
              Information Technology</p>
            <p className="mt-4"><strong>UNION ASSURANCE PLC</strong><br />
              No 200, Union Place Road<br />
              Colombo 03, Sri Lanka</p>
            {/* Using a placeholder for the logo */}
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Union Assurance Logo" className="h-12 mt-4" />
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">John keells Group - Confidential</p>
          </>
        ),
      },
    ],
  };

  // State for dropdown values
  const [status, setStatus] = useState(ticketData.status);
  const [priority, setPriority] = useState(ticketData.priority);
  const [group, setGroup] = useState(ticketData.group);
  const [assignee, setAssignee] = useState(ticketData.assignee);

  // Toggle CC recipient selection
  const toggleCcRecipient = (name: keyof CcRecipients) => {
    setCcRecipients(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Handle reply submission
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reply submitted:', replyContent);
    console.log('CC recipients:', ccRecipients);
    setReplyContent('');
    setIsReplying(false);
  };

  // Handle forward submission
  const handleForwardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Forward submitted:', forwardContent);
    console.log('Forward recipients:', forwardRecipients);
    setForwardContent('');
    setForwardRecipients({ to: '', cc: '' });
    setIsForwarding(false);
  };

  // Toggle reply form and ensure forward form is closed
  const toggleReply = () => {
    setIsForwarding(false);
    setIsReplying(!isReplying);
  };

  // Toggle forward form and ensure reply form is closed
  const toggleForward = () => {
    setIsReplying(false);
    setIsForwarding(!isForwarding);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">

      <main className="flex-1 p-4 md:ml-64 h-auto pt-20 flex">
        <div className="flex-1 flex flex-col space-y-4 pr-4">
          {/* Action Buttons */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex space-x-2 overflow-x-auto">
            <button
              type="button"
              onClick={toggleReply}
              className={`${isReplying ? 'bg-blue-800' : 'bg-blue-700'} text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              <FaReply className="w-4 h-4 me-2" />
              Reply
            </button>
            <button 
              type="button" 
              onClick={toggleForward}
              className={`${isForwarding ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'} text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center`}
            >
              <FaShareSquare className="w-4 h-4 me-2" />
              Forward
            </button>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center">
              <FaTimes className="w-4 h-4 me-2" />
              Close
            </button>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center">
              <FaArrowsAltH className="w-4 h-4 me-2" />
              Merge
            </button>
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 inline-flex items-center">
              <FaTrash className="w-4 h-4 me-2" />
              Delete
            </button>
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleReplySubmit}>
                {/* From & To */}
                <div className="mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">From</h4>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">iPhonik Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">support@iphonik.com</p>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">To</h4>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">charanaranasinghe@sampath.lk</p>
                    </div>
                  </div>

                  {/* Cc */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cc:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ccOptions.map((recipient) => (
                        <label
                          key={recipient.key}
                          className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                        >
                          <input
                            type="checkbox"
                            checked={ccRecipients[recipient.key]}
                            onChange={() => toggleCcRecipient(recipient.key)}
                            className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-600"
                          />
                          <span className="ml-3 text-sm text-gray-800 dark:text-gray-200">{recipient.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label htmlFor="replyContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="replyContent"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={8}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Type your reply here..."
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <FaPaperclip className="mr-2" />
                    Attach File
                  </button>

                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsReplying(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Forward Form */}
          {isForwarding && (
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleForwardSubmit}>
                {/* From */}
                <div className="mb-4">
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">From</h4>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">iPhonik Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">support@iphonik.com</p>
                  </div>
                </div>

                {/* To */}
                <div className="mb-4">
                  <label htmlFor="forwardTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To
                  </label>
                  <input
                    type="email"
                    id="forwardTo"
                    value={forwardRecipients.to}
                    onChange={(e) => setForwardRecipients({...forwardRecipients, to: e.target.value})}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="recipient@example.com"
                    required
                    multiple
                  />
                </div>

                {/* Cc */}
                <div className="mb-4">
                  <label htmlFor="forwardCc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cc
                  </label>
                  <input
                    type="email"
                    id="forwardCc"
                    value={forwardRecipients.cc}
                    onChange={(e) => setForwardRecipients({...forwardRecipients, cc: e.target.value})}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="cc@example.com"
                    multiple
                  />
                </div>

                {/* Original Message */}
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Original Message</h4>
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    <p><strong>From:</strong> {ticketData.emails[0]?.from}</p>
                    <p><strong>Date:</strong> {ticketData.emails[0]?.date}</p>
                    <p><strong>Subject:</strong> {ticketData.emails[0]?.subject}</p>
                    <div className="mt-2 border-t border-gray-300 dark:border-gray-600 pt-2">
                      {ticketData.emails[0]?.body}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label htmlFor="forwardContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="forwardContent"
                    value={forwardContent}
                    onChange={(e) => setForwardContent(e.target.value)}
                    rows={8}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Add a message to accompany the forwarded email..."
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <FaPaperclip className="mr-2" />
                    Attach File
                  </button>

                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsForwarding(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Forward
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Email Thread */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {ticketData.subject}
            </h2>

            {ticketData.emails.map((email, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">From:</span>
                  <span className="text-blue-600 dark:text-blue-400">{email.from}</span>
                  <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{email.date}</span>
                </div>
                <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Sent:</span>
                  <span>{email.date}</span>
                </div>
                <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">To:</span>
                  <span>{email.to}</span>
                </div>
                {email.cc && (
                  <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Cc:</span>
                    <span>{email.cc}</span>
                  </div>
                )}
                <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Subject:</span>
                  <span>{email.subject}</span>
                </div>
                <div className="prose dark:prose-invert text-gray-800 dark:text-gray-200 leading-relaxed">
                  {email.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (Properties) */}
        <div className="w-80 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 flex-shrink-0 ml-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{status}</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">By {ticketData.resolutionDueDate}</p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">PROPERTIES</h3>

          <div className="mb-3">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <div className="relative mt-1">
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none"
              >
                {ticketData.statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            <div className="relative mt-1">
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none"
              >
                {ticketData.priorityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Group</label>
            <div className="relative mt-1">
              <select
                id="group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none"
              >
                {ticketData.groupOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assignee</label>
            <div className="relative mt-1">
              <select
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="block w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none"
              >
                {ticketData.assigneeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default TicketDetail;