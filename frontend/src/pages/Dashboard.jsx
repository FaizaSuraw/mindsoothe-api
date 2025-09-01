import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Dashboard() {
  const [entries, setEntries] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("neutral")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [editId, setEditId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const token = JSON.parse(localStorage.getItem("tokens"))?.access

  const fetchEntries = async () => {
    try {
      const res = await api.get("/entries/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setEntries(res.data)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch entries.")
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (editId) {
        await api.put(
          `/entries/${editId}/`,
          { title, content, mood },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        setEditId(null)
      } else {
        await api.post("/entries/", { title, content, mood }, { headers: { Authorization: `Bearer ${token}` } })
      }
      setTitle("")
      setContent("")
      setMood("neutral")
      fetchEntries()
    } catch (err) {
      console.error(err)
      setError(editId ? "Failed to update entry." : "Failed to create entry.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (entry) => {
    setEditId(entry.id)
    setTitle(entry.title)
    setContent(entry.content)
    setMood(entry.mood)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setLoading(true)
    setError("")
    try {
      await api.delete(`/entries/${deleteId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchEntries()
      setDeleteId(null)
    } catch (err) {
      console.error(err)
      setError("Failed to delete entry.")
    } finally {
      setLoading(false)
    }
  }

  const moodEmojis = {
    happy: "😊",
    neutral: "😐",
    sad: "😔",
  }

  const moodColors = {
    happy: "from-yellow-400 to-orange-500",
    neutral: "from-slate-400 to-slate-500",
    sad: "from-blue-400 to-indigo-500",
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Your Mental Wellness Journal</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Track your thoughts, emotions, and progress on your journey to better mental health.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            {editId ? "Edit Your Entry" : "Create New Entry"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="What's on your mind today?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Thoughts</label>
              <textarea
                placeholder="Express yourself freely..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white resize-none"
                rows={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">How are you feeling?</label>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(moodEmojis).map(([moodKey, emoji]) => (
                  <label key={moodKey} className="cursor-pointer">
                    <input
                      type="radio"
                      name="mood"
                      value={moodKey}
                      checked={mood === moodKey}
                      onChange={(e) => setMood(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        mood === moodKey
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="text-3xl mb-2">{emoji}</div>
                      <div className="font-medium text-slate-700 capitalize">{moodKey}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {editId ? "Updating..." : "Saving..."}
                </div>
              ) : editId ? (
                "Update Entry"
              ) : (
                "Save Entry"
              )}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null)
                  setTitle("")
                  setContent("")
                  setMood("neutral")
                }}
                className="w-full bg-slate-200 text-slate-700 py-3 rounded-xl hover:bg-slate-300 transition-all duration-200 font-medium"
              >
                Cancel Edit
              </button>
            )}
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Your Journal Entries</h3>

          {entries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-700 mb-2">No entries yet</h4>
              <p className="text-slate-500">Start your mental wellness journey by creating your first entry above.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="group bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${moodColors[entry.mood]} rounded-xl flex items-center justify-center text-white text-xl`}
                    >
                      {moodEmojis[entry.mood]}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteId(entry.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{entry.title}</h3>

                  <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">{entry.content}</p>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="capitalize font-medium">Feeling {entry.mood}</span>
                    <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Delete Entry</h2>
              <p className="text-slate-600">
                Are you sure you want to delete this journal entry? This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
