import { BorderBeam } from "./border-beam";
 
export function BorderBeamDemo() {
  return (
    <div className="relative flex h-[10px] w-[10px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <h1>hi</h1>
      <BorderBeam size={20} duration={12} delay={9} />
    </div>
  );
}