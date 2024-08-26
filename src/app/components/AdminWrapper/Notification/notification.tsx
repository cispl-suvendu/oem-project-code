import Image from "next/image";
import Bell from "@/src/assets/bell.svg";

export default function Notification() {
  return (
    <>
      <div className="bell">
        <Image alt="loading" height={200} width={400} src={Bell} />
      </div>
    </>
  );
}
