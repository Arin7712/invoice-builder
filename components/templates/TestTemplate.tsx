import { InvoiceFormData } from "@/lib/utils/FormData";
import { sub } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import React, { useRef, useState } from "react";

const TestTemplate: React.FC = () => {
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

    const imgProperty = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperty.height * pdfWidth) / imgProperty.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`example.pdf`);
  };

  // Hardcoded example data
  const invoiceData = {
    invoiceNumber: "INV-123456",
    invoiceDate: "2024-12-20",
    dueDate: "2024-12-30",
    imageURL: "/path-to-your-logo.png",
    companyName: "Real Estate Agency",
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    streetName: "123 Main St",
    city: "Cityville",
    state: "State",
    country: "Country",
    clientCompany: "Client Corp.",
    clientName: "Client Name",
    clientEmail: "client@example.com",
    clientPhoneNumber: "987-654-3210",
    clientStreetName: "456 Client St",
    clientCityName: "Client City",
    clientStateName: "Client State",
    clientCountry: "Client Country",
    paypalEmail: "paypal@example.com",
    bankNumber: "9876543210",
    items: [
      { name: "Property Listing", description: "Property Description", quantity: 1, price: "200,000.00" },
      { name: "Commission", description: "Real Estate Commission", quantity: 1, price: "20,000.00" },
    ],
    notes: [
      { description: "Thank you for your business!" },
      { description: "Please pay by the due date to avoid late fees." },
    ]
  };

  let subtotal = 0;
  invoiceData.items.map((items) => {
    subtotal = items.price * items.quantity + subtotal;
  });

  let total = subtotal / 100 * 10 + subtotal;

  return (
    <>
      <div ref={printRef} className="max-w-screen-lg mx-auto border border-gray-300 rounded-lg shadow-md bg-white">
        {/* Header */}
        <div className="p-8">
          <div className="flex justify-between items-center">
            <Image src={invoiceData.imageURL} width={120} height={120} alt="logo" />
            <div className="text-start">
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
                <p>{invoiceData.clientStreetName}, {invoiceData.clientCityName}, {invoiceData.clientStateName}, {invoiceData.clientCountry}</p>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-20 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-200">
                  <th className=" px-4 py-2 text-start">Name</th>
                  <th className=" px-4 py-2 text-start">Description</th>
                  <th className=" px-4 py-2 text-start">Quantity</th>
                  <th className=" px-4 py-2 text-start">Price</th>
                  <th className=" px-4 py-2 text-start">Tax</th>
                  <th className=" px-4 py-2 text-start">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b-2">
                    <td className=" px-4 py-2 text-start">{item.name}</td>
                    <td className=" px-4 py-2 text-start">{item.description}</td>
                    <td className=" px-4 py-2 text-start">{item.quantity}</td>
                    <td className=" px-4 py-2 text-start">{item.price}</td>
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
                    <p>{invoiceData.bankNumber}</p>
                  </div>
                </div>
              </div>
              <div className="w-[34%] flex flex-col gap-4">
                <div className="flex justify-between">
                  <h1 className="font-bold">Subtotal</h1>
                  <p>{subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm">Discount(20%)</h1>
                  <p>489</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm">Shipping cost</h1>
                  <p>489</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm">Sales Tax</h1>
                  <p>489</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold">Total</h1>
                  <p>{total}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm">Amount paid</h1>
                  <p>489</p>
                </div>

                <div className="flex justify-between bg-blue-200 p-2">
                  <h1 className="text-lg">Balance Due</h1>
                  <p>{total}</p>
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
            </div>
          </div>
        </div>
      </div>
      <button onClick={handeDownloadPdf}>Download</button>
    </>
  );
};

export default TestTemplate;
