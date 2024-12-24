import React from "react";
import PaddedCover from "./PaddedCover";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Component } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Navbar = async({user}: {user: string | undefined | null}) => {

  return (
    <PaddedCover>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/invoice-details">
          <h1 className="text-subtle1 font-semibold text-2xl">GenVoice</h1>
          </Link>
        </div>

        {/*<div className='bg-[#42206c] px-6 py-2 rounded-md border-gray-700 bg-opacity-20'>
                <ul className='flex items-center gap-[7rem] text-purple-200 text-sm font-medium'>
                    <li>About</li>
                    <li>Service</li>
                    <li>Reviews</li>
                </ul>
            </div>*/}

        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r py-1.5 text-purple-300 shadcn-btn from-[#401f6c] via-[#291247] to-[#18082a] border-[1px] px-6 border-purple-800">
            {!user ?(
              <SignedOut>
                <SignInButton/>
              </SignedOut>
            ) : (

              <SignOutButton/>
            )

            }
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </PaddedCover>
  );
};

export default Navbar;
