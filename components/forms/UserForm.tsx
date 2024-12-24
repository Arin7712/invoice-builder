import Image from "next/image";
import countryList from 'react-select-country-list';
import { ChangeEvent, ReactNode, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {countries} from '@/lib/index'


type UserData = {
  companyName: string;
  name: string;
  phoneNumber: string;
  streetName: string;
  city: string;
  imageURL: string;
  state: string;
  zip: string;
  email: string;
  invoiceDate: string;
  dueDate: string;
  country: string;
};

type UserFormProps = UserData & {
  updateFields: (field: Partial<UserData>) => void;
};

export function UserForm({
  companyName,
  streetName,
  phoneNumber,
  imageURL,
  state,
  name,
  city,
  country,
  zip,
  email,
  invoiceDate,
  dueDate,
  updateFields,
}: UserFormProps) {

  const [previewImage, setPreviewImage] = useState(imageURL || ""); // Store image preview URL
  const [myCountry, setMyCountry] = useState("");


  function changeCountry(value: string){
    setMyCountry(value);
    updateFields({country: value})
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result); // Update preview
        updateFields({ imageURL: result }); // Update parent state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <div className="flex items-center gap-4">
    <Image src={previewImage || "/go.png"} width={40} height={40} alt="logo" className="rounded-full object-contain"/>
    <input type="file"
                  accept="image/*"
                  id="fileInput"
                  placeholder="Upload a photo"
                  className="hidden"
                  onChange={handleImageChange}
                  />
                  <label
    htmlFor="fileInput"
    className="bg-[#1A1A1A] rounded-md text-sm px-3 py-1 border-[1px] border-[#444444] text-neutral-300 cursor-pointer"
  >Add logo</label>
    </div>
      <label htmlFor="name" className="form-label">
        Your Name
      </label>
      <input
        className="form-input"
        type="text"
        name="name"
        required
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />

      <label htmlFor="companyName" className="form-label">
        Company name
      </label>
      <input
        className="form-input"
        type="text"
        name="companyName"
        required
        value={companyName}
        onChange={(e) => updateFields({ companyName: e.target.value })}
      />

      <label htmlFor="phoneNumber" className="form-label">
        Phone number
      </label>
      <input
        className="form-input"
        type="text"
        name="phoneNumber"
        required
        value={phoneNumber}
        onChange={(e) => updateFields({ phoneNumber: e.target.value })}
      />

      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        className="form-input"
        type="text"
        name="email"
        required
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />

<label htmlFor="street" className="form-label">
        Street no.
      </label>
      <input
        className="form-input"
        type="text"
        name="street"
        required
        value={streetName}
        onChange={(e) => updateFields({ streetName: e.target.value })}
      />
<div className="flex justify-between">
  <div className="flex flex-col gap-2">
<label htmlFor="city" className="form-label">
        City
      </label>
      <input
        className="form-input"
        type="text"
        name="city"
        required
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      />
      </div>
<div className="flex flex-col gap-2">
<label htmlFor="country" className="form-label">
        Country
      </label>
      <Select onValueChange={(value) => changeCountry(value)}>
        <SelectTrigger className="w-[280px] text-neutral-200 bg-[#1A1A1A]">
          <SelectValue placeholder={myCountry? country: "Select a country"}/>
        </SelectTrigger>
        <SelectContent>
        {countries.map((item: any, index:number) => (
          <SelectItem  key={index} value={item.name}>{item.name}</SelectItem>
        ))}
        </SelectContent>
      </Select>
      {/* <input type="text" name="country" required className="form-input" value={country} onChange={e => updateFields({country: e.target.value})}/> */}
    </div>
    </div>

    </>
  );
}
