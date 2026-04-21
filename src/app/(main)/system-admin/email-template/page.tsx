"use client";

import { useState, useMemo } from "react";
import { Plus, Trash2, Pencil, Search, Eye, X, Mail } from "lucide-react";
import JoditEditor from "jodit-react";

export default function EmailTemplates() {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "Password Reset",
      slug: "Password-Reset",
      subject: "Reset Your Password",
      content: "<h2>Reset Your Password</h2><p>Hello ##USER_NAME##</p>",
      status: true,
    },
  ]);

  const [form, setForm] = useState<any>({
    title: "",
    slug: "",
    subject: "",
    content: "",
    status: true,
  });

  const [drawer, setDrawer] = useState(false);
  const [preview, setPreview] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // 🔍 SEARCH (same UI, working logic)
  const filtered = useMemo(() => {
    return templates.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, templates]);

  const totalEntries = filtered.length;

  const paginatedData = filtered.slice((page - 1) * perPage, page * perPage);

  const totalPages = Math.ceil(totalEntries / perPage);

  // ➕ ADD
  const handleAdd = () => {
    setForm({
      title: "",
      slug: "",
      subject: "",
      content: "",
      status: true,
    });
    setEditId(null);
    setDrawer(true);
  };

  // EDIT
  const handleEdit = (item: any) => {
    setForm(item);
    setEditId(item.id);
    setDrawer(true);
  };

  // SAVE
  const handleSave = () => {
    if (editId) {
      setTemplates((prev) =>
        prev.map((t) => (t.id === editId ? { ...form } : t)),
      );
    } else {
      setTemplates([...templates, { ...form, id: Date.now() }]);
    }
    setDrawer(false);
  };

  // DELETE
  const handleDelete = (id: number) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  //  STATUS
  const toggleStatus = (id: number) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t)),
    );
  };

  // VARIABLE PREVIEW
  const renderEmail = (html: string) => {
    const replaced = html
      .replace(/##USER_NAME##/g, "Manmohan")
      .replace(/##USER_EMAIL##/g, "demo@mail.com")
      .replace(/##STATUS##/g, "Active")
      .replace(/##RESET_LINK##/g, "#");

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f9fafb;
            padding: 20px;
            margin: 0;
          }
          .email-box {
            max-width: 500px;
            margin: auto;
            background: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 0 0 1px #e5e7eb;
          }
          h2 {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            color: #374151;
            line-height: 1.6;
          }
          .btn {
            display: inline-block;
            background: #c2410c;
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 15px 0;
          }
          .center {
            text-align: center;
          }
          .small {
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="email-box">
          ${replaced}
        </div>
      </body>
    </html>
  `;
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* HEADER (UNCHANGED DESIGN) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-base md:text-xl font-bold text-gray-800">
          Email Templates
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-[220px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search template"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
            />
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700 w-full sm:w-auto"
          >
            <Plus size={18} />
            <span className="text-sm">Add Template</span>
          </button>
        </div>
      </div>

      {/* TABLE (UNCHANGED DESIGN) */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  S.No
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[200px]">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[200px]">
                  Slug
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[200px]">
                  Subject
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    {(page - 1) * perPage + i + 1}
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    {item.title}
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600">
                      {item.slug}
                    </span>
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    {item.subject}
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        item.status
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.status ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-3 justify-end">
                      <button
                        className="text-gray-400 hover:text-orange-500 transition"
                        onClick={() => {
                          setForm(item);
                          setPreview(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-blue-500 transition"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500 transition"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-3 md:px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Showing {totalEntries === 0 ? 0 : (page - 1) * perPage + 1} to{" "}
            {Math.min(page * perPage, totalEntries)} of {totalEntries} entries
          </p>

          <div className="flex items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
            >
              Previous
            </button>

            <button className="px-3 py-1.5 text-sm rounded-lg bg-orange-600 text-white">
              {page}
            </button>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* DRAWER */}
      {drawer && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-800">
                {editId ? "Edit" : "Add"} Email Template
              </h2>
              <button
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                onClick={() => setDrawer(false)}
              >
                <X size="18" />
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* ALERT */}
              <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Use these dynamic variables in your email template:
                <b> ##USER_NAME##</b>, <b>##USER_EMAIL##</b>, <b>##STATUS##</b>
              </div>

              {/* ROW 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition border-gray-300 bg-white"
                    placeholder="Title"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        slug: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition border-gray-300 bg-white"
                    placeholder="Slug"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition border-gray-300 bg-white"
                  placeholder="Subject"
                />
              </div>

              {/* CONTENT */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Content <span className="text-red-500">*</span>
                </label>

                <div className="overflow-hidden">
                  <JoditEditor
                    value={form.content}
                    config={{ height: 300 }}
                    onChange={(c) => setForm({ ...form, content: c })}
                  />
                </div>
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    checked={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setDrawer(false)}
                className="rounded-lg border border-red-400 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="rounded-lg bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700 transition disabled:opacity-60"
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setPreview(false)}
          />

          {/* MODAL */}
          <div className="relative z-50 flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh]">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-2 text-gray-800">
                <Mail className="text-orange-500" size={18} />
                <h2 className="text-base font-semibold">Email Preview</h2>
              </div>

              <button
                onClick={() => setPreview(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* INFO SECTION */}
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-3 space-y-1.5">
              <div className="flex items-start gap-2 text-sm">
                <span className="w-16 shrink-0 font-medium text-gray-500">
                  Title:
                </span>
                <span className="text-gray-800">{form.title}</span>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <span className="w-16 shrink-0 font-medium text-gray-500">
                  Slug:
                </span>
                <span className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs text-gray-700">
                  {form.slug}
                </span>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <span className="w-16 shrink-0 font-medium text-gray-500">
                  Subject:
                </span>
                <span className="text-gray-800">{form.subject}</span>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <span className="w-16 shrink-0 font-medium text-gray-500">
                  Status:
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    form.status
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {form.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                Content Preview
              </p>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-inner">
                {/* iframe for email rendering */}
                <iframe
                  title="Email Preview"
                  srcDoc={renderEmail(form.content)}
                  className="w-full h-80 border-0 rounded"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setPreview(false)}
                className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
