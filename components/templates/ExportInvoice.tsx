import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";

const ExportInvoice = () => {
  const printRef = useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return console.log("No element to capture");

    const canvas = await html2canvas(element, {
      scale: 2, // Improve quality by increasing scale
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProperty = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperty.height * pdfWidth) / imgProperty.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice.pdf`);
  };

  return (
    <>
      <div
        ref={printRef}
        className="bg-white mx-auto border rounded-lg p-4 sm:p-8"
        style={{
          maxWidth: "210mm",
          height: "297mm",
          margin: "auto",
        }}
      >
        <div className="text-center bg-purple-600 text-white py-2">
          <h1 className="text-xl font-bold">Export Invoice</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b py-4">
          <div>
            <p>
              <strong>Business Name :</strong>
            </p>
            <p>
              <strong>Address :</strong>
            </p>
          </div>
          <div>
            <p>
              <strong>GSTIN No :</strong>
            </p>
            <p>
              <strong>Date :</strong>
            </p>
          </div>
        </div>

        <div className="text-center bg-purple-600 text-white py-2 mt-4">
          <p>
            Supply Meant For Export Under Bond Or Letter Of Undertaking Without
            Payment Of Integrated Goods And Service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b py-4">
          <div>
            <p>
              <strong>Name :</strong>
            </p>
            <p>
              <strong>Invoice No :</strong>
            </p>
            <p>
              <strong>Reverse Charge :</strong>
            </p>
            <p>
              <strong>State :</strong>
            </p>
          </div>
          <div>
            <p>
              <strong>Transport Mode :</strong>
            </p>
            <p>
              <strong>Vehicle Number :</strong>
            </p>
            <p>
              <strong>Date Of Supply :</strong>
            </p>
            <p>
              <strong>Place Of Supply :</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b py-4">
          <div className="border p-2">
            <h2 className="bg-purple-600 text-white text-center py-1">
              Details of Receiver (Billed To)
            </h2>
            <p>
              <strong>Name :</strong>
            </p>
            <p>
              <strong>Address :</strong>
            </p>
            <p>
              <strong>Country :</strong>
            </p>
          </div>
          <div className="border p-2">
            <h2 className="bg-purple-600 text-white text-center py-1">
              Details of Consignee (Shipped To)
            </h2>
            <p>
              <strong>Name :</strong>
            </p>
            <p>
              <strong>Address :</strong>
            </p>
            <p>
              <strong>Country :</strong>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border mt-4">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="border px-2 py-1">S.No</th>
                <th className="border px-2 py-1">Goods Description</th>
                <th className="border px-2 py-1">HSN</th>
                <th className="border px-2 py-1">QTY</th>
                <th className="border px-2 py-1">MRP</th>
                <th className="border px-2 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t py-4 mt-4">
          <div>
            <h2 className="text-lg font-bold">Bank Details</h2>
            <p>
              <strong>Account Name :</strong>
            </p>
            <p>
              <strong>Account Number :</strong>
            </p>
            <p>
              <strong>IFSC Code :</strong>
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Total :</strong>
            </p>
            <p>
              <strong>GST :</strong>
            </p>
            <p>
              <strong>Grand Total :</strong>
            </p>
          </div>
        </div>
      </div>

      <button
        className="px-3 py-1 mt-6 mb-6 inline-block justify-center items-center rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
        onClick={handleDownloadPdf}
      >
        Download
      </button>
    </>
  );
};

export default ExportInvoice;
