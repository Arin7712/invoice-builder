"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type InvoiceProps = {
  invoiceData: {
    companyName: string,
    streetName: string,
    city: string,
    state: string,
    zip: string,
    email: string,
    clientName: string,
    clientStreetName: string,
    clientCityName: string,
    clientStateName: string,
    clientZip: string,
    clientEmail: string,
    invoiceDate: string,
    dueDate: string,
    items: {
      name: string;
      description: string;
      quantity: number;
      price: number;
    }[]
  }
}

export default function Invoice({invoiceData} : InvoiceProps) {

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

  let sum = 0;
  const subTotal = invoiceData.items.map((item, index) => {
    let total = (parseFloat(item.quantity.toString()) || 0) * (parseFloat(item.price.toString()) || 0)
    sum = sum + total
  })

  let tax = (sum/100) * 10
  let total = sum + tax

  if (!invoiceData) return null; // Don't render if no invoice data is passed

  return (
    <div className=" py-10">
      <div ref={printRef}>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Invoice Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
              <p className="text-gray-500">Invoice #001</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">{invoiceData.companyName}</p>
              <p className="text-gray-500">{invoiceData.streetName}</p>
              <p className="text-gray-500">{invoiceData.city}, {invoiceData.state}, {invoiceData.zip}</p>
              <p className="text-gray-500">Email: {invoiceData.email}</p>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-600 font-medium">Bill To:</p>
              <p className="text-gray-800 font-semibold">{invoiceData.clientName}</p>
              <p className="text-gray-500">{invoiceData.clientStreetName}</p>
              <p className="text-gray-500">{invoiceData.clientCityName}, {invoiceData.clientStateName}, {invoiceData.clientZip}</p>
              <p className="text-gray-500">Email: {invoiceData.clientEmail}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 font-medium">Invoice Date:</p>
              <p className="text-gray-800">{invoiceData.invoiceDate}</p>
              <p className="text-gray-600 font-medium">Due Date:</p>
              <p className="text-gray-800">{invoiceData.dueDate}</p>
            </div>
          </div>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                <th className="px-4 py-2 bg-gray-200 text-gray-600 font-medium text-left">
                    Name
                  </th>
                  <th className="px-4 py-2 bg-gray-200 text-gray-600 font-medium text-left">
                    Description
                  </th>
                  <th className="px-4 py-2 bg-gray-200 text-gray-600 font-medium text-left">
                    Quantity
                  </th>
                  <th className="px-4 py-2 bg-gray-200 text-gray-600 font-medium text-left">
                    Price
                  </th>
                  <th className="px-4 py-2 bg-gray-200 text-gray-600 font-medium text-left">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Row */}
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${(parseFloat(item.quantity.toString()) || 0) * (parseFloat(item.price.toString()) || 0)}</td>
                  </tr>
                ))}
               
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="mt-6 grid grid-cols-2">
            <div></div>
            <div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-700 font-medium">${sum}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax (10%):</span>
                <span className="text-gray-700 font-medium">${tax}</span>
              </div>
              <div className="flex justify-between py-2 border-t font-bold">
                <span className="text-gray-800">Total:</span>
                <span className="text-gray-800">${total}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-10 text-gray-500 text-sm">
            Thank you for your business! Please make the payment before the due
            date.
          </div>
        </div>
      </div>
      <button onClick={handeDownloadPdf}>Download</button>
    </div>
  );
}
