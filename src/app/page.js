import Image from "next/image";
import Contents from "./components/Contents";
import Content from "./components/Content";
import Game from "./components/Game";

export default function Home() {
  return (
    <>
      <Contents>
        <Content name="디시인사이드" community="dcinside"/>
        <Content name="네이버 뿜" community="bb"/>
        <Content name="네이트판" community="nate"/>
      </Contents>
      <Game />
    </>
  );
}
