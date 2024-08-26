import RankCard, { RankCardProps } from "../RankCard"; 
import top1 from "@/src/assets/top1.png";
import top2 from "@/src/assets/top2.png";
import top3 from "@/src/assets/top3.png";
import rank from "@/src/assets/rank.svg";
import rank2 from "@/src/assets/rank2.svg";
import rank3 from "@/src/assets/rank3.svg";

const data = [
    {
      image: rank,
      name: "John Leboo",
      des: "Neo Programming League_NPL",
      ranking: top1,
    },
    {
      image: rank2,
      name: "Samuel Kingasunye",
      des: "Neo Programming League_NPL",
      ranking: top2,
    },
    {
      image: rank3,
      name: "Stephen Kerubo",
      des: "Neo Programming League_NPL",
      ranking: top3,
    },
  ];
export default function LeaderBoard() {

    return (
        <>
        
        <div className="recent-test">
            <h1>
              <i className="fa fa-edit"></i>Leader Board
            </h1>
            <div className="top-lists bg-white">
              {data.map((item, idx) => (
                <RankCard key={idx} data={item as unknown as RankCardProps} />
              ))}
            </div>
          </div>
        </>
    )
}