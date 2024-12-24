import { InvoiceFormData } from "@/lib/utils/FormData";
import { sub } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";

type invoiceProps = {
    invoiceData: InvoiceFormData
};

const RealEstateInvoice: React.FC<invoiceProps> = ({invoiceData}) => {

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [items, setItems] = useState([
    { description: "Prototype", rate: "20,230,450.00", qty: 2000, tax: "20.50%", disc: "20.50%", amount: "20,230,450.00" },
    { description: "Design", rate: "20,230,450.00", qty: 2000, tax: "20.50%", disc: "20.50%", amount: "20,230,450.00" },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { description: "New Item", rate: "0.00", qty: 1, tax: "0.00%", disc: "0.00%", amount: "0.00" },
    ]);
  };
  const printRef = useRef(null);

  const handeDownloadPdf = async () => {

    const element = printRef.current;
    if (!element) return console.log("No element to capture");
    
    
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfBlob = pdf.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);


    const imgProperty = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperty.height * pdfWidth ) / (imgProperty.width) ;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`example.pdf`);
  };

  let subtotal = 0;
  invoiceData.items.map((items, index) => {
    subtotal = items.price * items.quantity + subtotal
  })

  let discount = ((subtotal/100) * invoiceData.discount)

  let total = (subtotal/100 * invoiceData.tax) - ((subtotal/100) * invoiceData.discount) + subtotal;


  return (
    <div>
    
    <div ref={printRef} className="max-w-screen-lg mx-auto border border-gray-300 rounded-lg shadow-md bg-white">
      {/* Header */}
    <div className="p-8">
      <div className="flex justify-between items-center">
        <Image src={invoiceData.imageURL} width={120} height={120} alt="logo"/>
        <div className="text-right">
          <h2 className="text-3xl font-bold">Real Estate Commission Invoice</h2>
          <div className="mt-4 flex flex-col gap-1 text-gray-500">
          <p className="text-sm">Invoice no.: {invoiceData.invoiceNumber}</p>
          <p className="text-sm">Invoice date: {invoiceData.invoiceDate}</p>
          <p className="text-sm">Due: {invoiceData.dueDate}</p>
          </div>
        </div>
      </div>

      {/* From and To Section */}
      <div className="mt-16 mb-8 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-sm text-zinc-800">From</h3>
          <h1 className="font-bold text-2xl">{invoiceData.companyName}</h1>
          <div className="mt-6">
          <p>{invoiceData.name}</p>
          <p>{invoiceData.email}</p>
          <p>{invoiceData.phoneNumber}</p>
          <p>{invoiceData.streetName}, {invoiceData.city}, {invoiceData.state}, {invoiceData.country}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
        <h3 className="font-semibold text-sm text-zinc-800">Bill to:</h3>
          <h1 className="font-bold text-2xl">{invoiceData.clientCompany}</h1>
          <div className="mt-6 flex flex-col items-end">
          <p>{invoiceData.clientName}</p>
          <p>{invoiceData.clientEmail}</p>
          <p>{invoiceData.clientPhoneNumber}</p>
          <p>{invoiceData.clientStreetName}, {invoiceData.clientCountry}</p>
          </div>
        </div>
      </div>

      

      {/* Table Section */}
      <div className="mt-20 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-right">Description</th>
              <th className="py-2 px-4 text-right">Quantity</th>
              <th className="py-2 px-4 text-right">Price</th>
              <th className="py-2 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b-2">
                <td className=" px-4 py-2 ">{item.name}</td>
                <td className=" px-4 py-2 text-right">{item.description}</td>
                <td className=" px-4 py-2 text-right">{item.quantity}</td>
                <td className=" px-4 py-2 text-right">{item.price}</td>
                <td className=" px-4 py-2 text-right">{(item.quantity * item.price).toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="mt-20">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-xl">Payment instruction</h3>
            <div className="mt-6 flex flex-col gap-4 text-sm">
                <div>
                    <p>Paypal email</p>
                    <p>{invoiceData.paypalEmail}</p>
                </div>
                <div>
                    <p>Make checks payable to</p>
                    <p>{invoiceData.name}</p>
                </div>
                <div>
                    <p>Routing (ABA)</p>
                    <p>{invoiceData.bankNumber.toString()}</p>
                </div>
            </div>
          </div>
          <div className="w-[34%] flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="font-bold">Subtotal</h1>
                <p>{subtotal.toString()}</p>
            </div>
            <div className="flex justify-between">
                <h1 className="text-sm">Discount(20%)</h1>
                <p>{discount.toString()}</p>
            </div>
            <div className="flex justify-between">
                <h1 className="text-sm">Tax</h1>
                <p>{(subtotal/100) * invoiceData.tax}</p>
            </div>
            <div className="flex justify-between">
                <h1 className="font-bold">Total</h1>
                <p>{total.toString()}</p>
            </div>
            <div className="flex justify-between">
                <h1 className="text-sm">Amount paid</h1>
                <p>{invoiceData.amountPaid.toString()}</p>
            </div>

            <div className="flex justify-between bg-blue-200 p-2">
                <h1 className="text-lg">Balance Due</h1>
                <p>{(total - invoiceData.amountPaid).toString()}</p>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h3 className="font-bold text-lg">Notes</h3>
          <div className="mt-4">
            {invoiceData.notes.map((note, index) => (
            <p key={index} className="text-sm">{note.description}</p>
            ))}
          </div>
          <p></p>
        </div>
      </div>
    </div>
    {/* <h1 className="justify-center text-center text-sm text-gray-400 mb-2">Thanks for trusting us !</h1> */}
    </div>
    <div className="flex items-center justify-center">
    <button className="px-3 py-1 mt-6 mb-6 inline-block justify-center items-center rounded-md border border-black bg-white text-black  text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={handeDownloadPdf}>Download</button>
    <Link href="/" className="px-3 py-1 mt-6 mb-6 inline-block justify-center items-center rounded-md border border-black bg-white text-black  text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">Home</Link>
    </div>
    </div>
  );
};

export default RealEstateInvoice;
