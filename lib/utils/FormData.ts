export type InvoiceFormData = {
    companyName: string,
    name: string,
    streetName: string,
    phoneNumber: string,
    clientPhoneNumber: string,
    imageURL: string,
    city: string,
    state: string,
    country: string,
    zip: string,
    email: string,
    shippingStreet: string,
    shippingCity: string,
    shippingState: string,
    shippingCountry: string,
    shippingTrackCode: string,
    clientName: string,
    clientStreetName: string,
    clientCityName: string,
    clientCompany: string,
    clientStateName: string,
    clientZip: string,
    invoiceDate: string,
    invoiceNumber: string,
    dueDate: string,
    clientCountry: string,
    clientEmail: string,
    amountPaid: number;
    bankNumber: string,
    currency: string,
    tax:number;
    discount: number,
    paypalEmail: string,
    notes: {
      description: string
    }[],
    items: {
      name: string;
      description: string;
      quantity: number;
      price: number;
    }[];
  }
  
export const INITIAL_DATA : InvoiceFormData = {
    companyName: "",
    streetName: "",
    imageURL: "",
    bankNumber: "",
    name: "",
    currency: "",
    discount: 0,
    amountPaid: 0,
    city: "",
    tax: 0,
    clientPhoneNumber: "",
    shippingStreet: "",
    paypalEmail: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingTrackCode: "",
    country: "",
    phoneNumber: "",
    state: "",
    clientCountry: "",
    zip: "",
    email: "",
    clientName: "",
    clientCompany: "",
    clientStreetName: "",
    clientCityName: "",
    clientStateName: "",
    clientZip: "",
    invoiceDate: "",
    invoiceNumber: "000",
    dueDate: "",
    clientEmail: "",
    notes: [{description: ''}],
    items: [{ name: '', description: '', quantity: 0, price: 0}],
  }