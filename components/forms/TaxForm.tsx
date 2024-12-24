import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { currencies } from "@/lib";

type TaxForm = {
  tax: number;
  discount: number;
  amountPaid: number;
  currency: string;
};

type TaxFormProps = TaxForm & {
  updateFields: (fields: Partial<TaxForm>) => void;
};

const TaxForm = ({
  tax,
  discount,
  amountPaid,
  currency,
  updateFields,
}: TaxFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="tax" className="form-label">
            Tax*
          </label>
          <input
            type="number"
            name="tax"
            onChange={(e) => updateFields({ tax: parseFloat(e.target.value) })}
            value={tax}
            required
            className="form-input"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="discount" className="form-label">
            Discount*
          </label>
          <input
            type="number"
            name="discount"
            onChange={(e) => updateFields({ discount: parseFloat(e.target.value) })}
            value={discount}
            required
            className="form-input"
          />
        </div>
      </div>

      <label htmlFor="amountPaid" className="form-label">
            Amount paid*
          </label>
          <input
            type="number"
            name="amountPaid"
            onChange={(e) => updateFields({ amountPaid: parseFloat(e.target.value) })}
            value={amountPaid}
            required
            className="form-input"
          />


    </div>
  );
};

export default TaxForm;
