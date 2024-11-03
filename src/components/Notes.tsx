import React, { useState } from 'react';
import { PenSquare, Save, Trash2 } from 'lucide-react';

type Note = {
  id: number;
  content: string;
  timestamp: number;
};

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now(),
      content: newNote,
      timestamp: Date.now(),
    };
    
    setNotes(prev => [note, ...prev]);
    setNewNote('');
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (!editingId) return;
    
    setNotes(prev =>
      prev.map(note =>
        note.id === editingId
          ? { ...note, content: editContent }
          : note
      )
    );
    
    setEditingId(null);
    setEditContent('');
  };

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-400">Notes</h2>
      
      <div className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="w-full p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
          rows={3}
        />
        <button
          onClick={addNote}
          className="mt-2 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="border dark:border-gray-700 rounded-md p-4">
            {editingId === note.id ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-2"
                  rows={3}
                />
                <button
                  onClick={saveEdit}
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 mr-2"
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{note.content}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => startEditing(note)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <PenSquare className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;