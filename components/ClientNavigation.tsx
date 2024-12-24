import Link from 'next/link'
import React from 'react'
import { BorderBeam } from './ui/border-beam'

const ClientNavigation = () => {
  return (
    <Link href="/invoice-details" >
      <div className="inline-block hover:cursor-pointer">
            <div className="relative px-4 py-1.5 text-lg bg-[#6505e0] rounded-xl shadow-[inset_0px_-6px_8px_0px_rgba(243,234,254,0.7)] text-[#f3eafe] border-[1px] border-opacity-25 border-slate-700">
                    Generate Invoice
                    <BorderBeam />
                  </div>
              </div>
    </Link>
  )
}

export default ClientNavigation
