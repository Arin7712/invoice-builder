import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import countries from '@/lib/index'

type clientData = {
clientName: string,
clientCompany: string,
  clientStreetName: string,
  clientCityName: string,
  clientStateName: string,
  country: string,
  clientZip: string,
  clientEmail: string,
  clientPhoneNumber: string,
  imageURL: string,
  clientCountry: string,
}

type clientFormPorps = clientData & {
    updateFields: (fields: Partial<clientData>) => void
}

export function ClientForm({clientName,imageURL, country,clientCompany ,clientPhoneNumber ,clientCityName, clientCountry,clientStreetName, clientZip, clientEmail, clientStateName ,updateFields} : clientFormPorps){
    return(
        <>
        <label htmlFor="clientCompany" className="form-label">Client company</label>
        <input type="text" name="clientCompany" required className="form-input" value={clientCompany} onChange={e => updateFields({clientCompany: e.target.value})}/>

        <label htmlFor="clientEmail" className="form-label">Client email</label>
        <input type="text" name="clientEmail" required className="form-input" value={clientEmail} onChange={e => updateFields({clientEmail: e.target.value})}/>

        <label htmlFor="clientPhoneNumber" className="form-label">Client phone</label>
        <input type="text" name="clientPhoneNumber" required className="form-input" value={clientPhoneNumber} onChange={e => updateFields({clientPhoneNumber: e.target.value})}/>

        <label htmlFor="clientStreet" className="form-label">Client street</label>
        <input type="text" name="clientStreet" required className="form-input" value={clientStreetName} onChange={e => updateFields({clientStreetName: e.target.value})}/>

        <label htmlFor="clientCountry" className="form-label">Client country</label>
        <input type="text" name="clientCountry" required className="form-input" value={clientCountry} onChange={e => updateFields({clientCountry: e.target.value})}/>
        </>
    )
}