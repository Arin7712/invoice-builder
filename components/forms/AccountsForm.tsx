"use client";

import { useState } from "react";

type AccountsData = {
  items: {
    name: string;
    description: string;
    quantity: number;
    price: number;
  }[];
};

type AccountsFormProps = AccountsData & {
  updateFields: (fields: Partial<AccountsData>) => void;
};

export function AccountsForm({ items, updateFields }: AccountsFormProps) {
  // Function to handle input changes dynamically for each field
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    // Map through the items array and update only the targeted index
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );

    updateFields({ items: updatedItems });
  };

  // Function to add a new blank item
  const handleAddItem = () => {
    const newItem = { name: "", description: "", quantity: 0, price: 0 };
    updateFields({ items: [...items, newItem] });
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    updateFields({ items: updatedItems });
  };

  return (
    <div>
      <h3>Items:</h3>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col mb-6 bg-neutral-900 border-[1px] border-[#444444] rounded-md p-2 items-center gap-4"
        >
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <label className="form-label">Item Name:</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div className="flex flex-col">
              <label className="form-label">Description:</label>
              <input
                className="form-input"
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <label className="form-label">Quantity:</label>
              <input
                className="form-input"
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div className="flex flex-col">
              <label className="form-label">Price:</label>
              <input
                className="form-input"
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
          </div>
          <button
            onClick={() => removeItem(index)}
            className="px-3 py-1  rounded-md border border-black bg-white text-black  text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            Remove Item
          </button>
        </div>
      ))}
      <button
        type="button"
        className="form-input mt-4 flex justify-center items-center"
        onClick={handleAddItem}
      >
        Add Another Item
      </button>
    </div>
  );
}
