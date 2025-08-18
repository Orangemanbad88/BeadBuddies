import dogMascotImage from "@assets/IMG_20250818_144553_1755542835173.png";

export default function WalkingMascot() {
  return (
    <div className="walking-mascot animate-walk">
      <img
        src={dogMascotImage}
        alt="Walking cartoon dog mascot"
        className="w-full h-full object-contain drop-shadow-lg"
        data-testid="img-walking-mascot"
      />
    </div>
  );
}
