import { IBio } from "../types/bio";

export const FindTime = (data: IBio[]) => {
  let countTime = 0;

  // Use map to create a new array with modified data
  const updatedData = data.map((item) => {
    if (item.stimu_num > 0) {
      if (countTime === 30) {
        countTime = 0;
      }
      countTime++;
    } else if (item.stimu_num < 0) {
      countTime = 0; // Set countTime to 0 when stimu_num < 0
    }

    // Return the updated item with modified videoSec
    return {
      ...item,
      videoSec: countTime,
    };
  });

  return updatedData; // Return the new array instead of updating the state directly
};

export const FindImageUrl = (stimu_num: number) => {
  switch (stimu_num) {
    case 1:
      return "../../img/01_パイ投げ.png";
    case 2:
      return "../../img/02_恐竜ダンス.png";
    case 5:
      return "../../img/05_スケートボード.png";
    case 6:
      return "../../img/06_格闘技.png";
    case 10:
      return "../../img/10_火星.png";
    case 12:
      return "../../img/12_祖母誕生日.png";
    case 15:
      return "../../img/15_ペロペロ犬.png";
    case 16:
      return "../../img/16_リラックス犬.png";
    case 19:
      return "../../img/19_森のせせらぎ１.png";
    case 20:
      return "../../img/20_森のせせらぎ２.png";
    default:
      return "";
  }
};







