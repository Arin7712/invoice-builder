import React from "react";

type NotesForm = {
  notes: {
    description: string;
  }[];
};

type NoteFormData = NotesForm & {
  updateFields: (fields: Partial<NotesForm>) => void;
};

const NotesForm = ({ notes, updateFields }: NoteFormData) => {
  // Function to handle input changes dynamically for each field
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    // Map through the items array and update only the targeted index
    const updatedItems = notes.map((note, i) =>
      i === index ? { ...note, [name]: value } : note
    );

    updateFields({ notes: updatedItems });
  };

  const handleAddNote = () => {
    const newItem = { description: "" };
    updateFields({ notes: [...notes, newItem] });
  };

  const removeNote = (index: number) => {
    const updatedItems = notes.filter((_, i) => i !== index);
    updateFields({ notes: updatedItems });
  };

  return (
    <div className="flex flex-col gap-4">
      {notes.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-900 w-full items-center border-[1px] rounded-md border-[#444444] flex gap-2 p-2 justify-between"
        >
          <div className="flex flex-col gap-2 w-full">
            {/* <label htmlFor="description" className='form-label'>note*</label> */}
            <input
              className="form-input"
              type="text"
              name="description"
              onChange={(e) => handleInputChange(e, index)}
              value={item.description}
            />
          </div>
          <button
            onClick={() => removeNote(index)}
            className="px-3 py-1  rounded-md border border-black bg-white text-black  text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="form-input mt-4 flex justify-center items-center"
        onClick={handleAddNote}
      >
        Add note
      </button>
    </div>
  );
};

export default NotesForm;
