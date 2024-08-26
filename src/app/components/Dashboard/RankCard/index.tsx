import image from "next/image";
import Image, { StaticImageData } from "next/image";
import React from "react";

export interface RankCardProps {
  image: StaticImageData;
  name: string;
  des: string;
  ranking: StaticImageData;
}

export default function RankCard({ data }: { data: RankCardProps }) {
  return (
    <div className="row  mb-4 justify-content-center align-items-center">
      <div className="col-2 p-0">
        <Image src={data.ranking} alt="loading" height={200} width={200} />
      </div>

      <div className="col-8 px-4">
        <h5>{data.name}</h5>
        <p>{data.des}</p>
      </div>
      <div className="col-2 p-0">
        <Image src={data.image} alt="loading" height={500} width={500} />
      </div>
    </div>
  );
}
