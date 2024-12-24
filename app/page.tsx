import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { BorderBeam } from "@/components/ui/border-beam";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import ClientNavigation from "@/components/ClientNavigation";

type FormData = {
  companyName: string;
  streetName: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  clientName: string;
  clientStreetName: string;
  clientCityName: string;
  clientStateName: string;
  clientZip: string;
  invoiceDate: string;
  dueDate: string;
  clientEmail: string;
  items: {
    name: string;
    description: string;
    quantity: number;
    price: number;
  }[];
};

const INITIAL_DATA: FormData = {
  companyName: "",
  streetName: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  clientName: "",
  clientStreetName: "",
  clientCityName: "",
  clientStateName: "",
  clientZip: "",
  invoiceDate: "",
  dueDate: "",
  clientEmail: "",
  items: [{ name: "", description: "", quantity: 0, price: 0 }],
};

export default async function Home() {
  let user = null;
  try {
    user = await currentUser();
  } catch (error) {
    console.log("error fetching user");
  }

  return (
    <div className="mt-[1.5rem]">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <Navbar user={user?.firstName} />
      <div className="relative top-0 z-[-2]  h-full w-[100%] bg-neutral-950 ">
        {/*<div className="absolute inset-0 flex items-center justify-center">
    <div className="w-60 h-60 bg-gradient-to-t from-purple-500 via-purple-700 to-purple-900 rounded-full border-4 border-transparent shadow-lg blur-lg"></div>
  </div>*\}

        {/* <GridBackgroundDemo/ */}
        <div className="flex flex-col justify-center items-center gap-6">
          <AnimatedGradientText>
            <AutoAwesomeIcon style={{ color: "#c0a4e2", fontSize: "18px" }} />{" "}
            <hr className="mx-2 h-4 w-px shrink-0 bg-[#c0a4e2]" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#c0a4e2] via-[#9c40ff] to-[#b640ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Your Cosmic Invoice Builder
            </span>
            <ChevronRight className="ml-1 size-3 text-[#c0a4e2] transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>

          <div className="md:w-[60%] w-full justify-center flex flex-col gap-6">
            <h1 className="font-bold text-6xl text-center bg-gradient-to-b from-[#f3eafe] to-[#d6b7fc] bg-clip-text text-transparent">
              Simplify your{" "}
              <span className="bg-gradient-to-b from-[#c59afc] to-[#a45eff] bg-clip-text text-transparent">
                Invoice
              </span>{" "}
              building with our instant builder
            </h1>
            <div className=" flex justify-center">
              <p className="text-[#d6b7fc] font-normal mt-6 text-lg text-center w-4/5">
                Effortlessly manage appointments, meetings, and tasks with our
                intelligent scheduling assistant
              </p>
            </div>
            <div className="flex justify-center">
              <ClientNavigation/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
