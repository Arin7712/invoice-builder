import React from 'react'

type PaymentDetails = {
    paypalEmail: string,
    bankNumber: string,
}

type PaymentDetailsForm = PaymentDetails & {
    updateFields: (field: Partial<PaymentDetails>) => void;
  };
  

const PaymentDetailsForm = ({paypalEmail, bankNumber, updateFields}: PaymentDetailsForm) => {
  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor="paypalEmail" className="form-label">
        Paypal email
      </label>
      <input
        className="form-input"
        type="text"
        name="paypalEmail"
        required
        value={paypalEmail}
        onChange={(e) => updateFields({ paypalEmail: e.target.value })}
      />

      <label htmlFor="bankNumber" className="form-label">
        Bank number
      </label>
      <input
        className="form-input"
        type="text"
        name="bankNumber"
        required
        value={bankNumber}
        onChange={(e) => updateFields({ bankNumber: e.target.value })}
      />
    </div>
  )
}

export default PaymentDetailsForm
