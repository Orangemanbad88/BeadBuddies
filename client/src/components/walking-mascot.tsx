import DogMascotSVG from "./dog-mascot-svg";

export default function WalkingMascot() {
  return (
    <div className="walking-mascot animate-walk">
      <DogMascotSVG
        className="w-full h-full drop-shadow-lg"
        data-testid="img-walking-mascot"
      />
    </div>
  );
}
