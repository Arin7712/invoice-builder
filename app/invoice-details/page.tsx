"use client";

import { AccountsForm } from "@/components/forms/AccountsForm";
import { ClientForm } from "@/components/forms/clientForm";
import CredientialsForm from "@/components/forms/CredientialsForm";
import NotesForm from "@/components/forms/NotesForm";
import PaymentDetailsForm from "@/components/forms/PaymentDetailsForm";
import TaxForm from "@/components/forms/TaxForm";
import { UserForm } from "@/components/forms/UserForm";
import ExportInvoice from "@/components/templates/ExportInvoice";
import Invoice from "@/components/templates/Invoice";
import RealEstateInvoice from "@/components/templates/RealEstateInvoice";
import { useMultiStepForm } from "@/components/useMultiStepForm";
import { INITIAL_DATA, InvoiceFormData } from "@/lib/utils/FormData";
import React, { FormEvent, useState } from "react";

import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link";

const InvoiceDetails = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [invoice, setInvoice] = useState(false);

  function updateFields(fields: Partial<InvoiceFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, next, back } =
    useMultiStepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <ClientForm {...data} updateFields={updateFields} />,
      <AccountsForm {...data} updateFields={updateFields} />,
      <PaymentDetailsForm {...data} updateFields={updateFields} />,
      <NotesForm {...data} updateFields={updateFields} />,
      <CredientialsForm {...data} updateFields={updateFields}/>,
      <TaxForm {...data} updateFields={updateFields}/>
    ]);

  const handleSubmitData = (invoiceData2: any) => {
    setData(invoiceData2);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (currentStepIndex !== steps.length - 1) {
      next();
    } else {
      setInvoice(true);
    }
  }


  let active = currentStepIndex;

  return (
    <>
    <div className="flex flex-col justify-center items-center p-10 absolute top-0 z-[-2] h-auto w-full bg-[#101010]">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-neutral-200">← Back</Link>
        <h1 className="text-3xl font-semibold text-neutral-200">
          Tell us about you
        </h1>
        <p className="text-neutral-400 w-4/5 font-normal text-sm">
          We just need some basic info to get your profile setup. You’ll be able
          to edit this later.
        </p>
      </div>
      <div className="flex flex-col mt-6 gap-2">
        <div>
          <p className="text-sm text-neutral-400 font-light">
            Step {currentStepIndex + 1}/{steps.length}
          </p>
        </div>
        <div className="flex gap-4 md:pr-0 md:pl-0 pr-4 pl-4">
          {steps.map((item, index) => (
            <div
            key={index}
              className={`md:w-[4rem] w-[3rem] h-1 ${
                active >= index ? "bg-slate-200" : "bg-zinc-900"
              } rounded-md`}
            ></div>
          ))}
        </div>
      </div>
      <div className="md:w-[40%] w-full mt-6 border-[1px] p-4 rounded-lg bg-[#111111]  border-zinc-700">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">{step}</div>
          <div className="flex justify-between">
          <button
          type="submit"
            className="px-4 py-2 mt-6 rounded-md border border-black bg-white text-black  text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
            {currentStepIndex === steps.length - 1 ? "Submit" : "Next Step"}
            </button>
          {active > 0 && (
            <button
            type="button"
              onClick={back}
              className="px-4 py-2 mt-6 rounded-md border border-black bg-white text-black  text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
              back
            </button>
          )}
        </div>
        </form>
        
      </div>

    </div>
      {invoice ? <RealEstateInvoice invoiceData={data} /> : <></>}
    </>
  );
};

export default InvoiceDetails;
