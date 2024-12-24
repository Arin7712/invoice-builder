import React from "react";
import { DatePickerWithPresets } from "../ui/DatePickerDemo";
import { DatePickerWithPresets2 } from "../ui/DatePickerDemo2";

type CredentialsData = {
  invoiceDate: string;
  dueDate: string;
  invoiceNumber: string;
};

type CredentialsFormProps = CredentialsData & {
  updateFields: (fields: Partial<CredentialsData>) => void;
};

const CredientialsForm = ({
  invoiceDate,
  invoiceNumber,
  dueDate,
  updateFields,
}: CredentialsFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="invoiceNumber" className="form-label">
        Invoice number
      </label>
      <input
        type="text"
        name="invoiceNumber"
        onChange={(e) => updateFields({ invoiceNumber: e.target.value })}
        value={invoiceNumber}
        required
        className="form-input"
      />
      {invoiceDate}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="invoiceDate" className="form-label">
            Invoice date
          </label>
          <DatePickerWithPresets
            updateFields={updateFields}
            invoiceDate={invoiceDate}
          ></DatePickerWithPresets>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dueDate" className="form-label">
            Due date
          </label>
          <DatePickerWithPresets2
            updateFields={updateFields}
            dueDate={dueDate}
          ></DatePickerWithPresets2>
        </div>
      </div>
    </div>
  );
};

export default CredientialsForm;
