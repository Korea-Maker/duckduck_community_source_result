import Image from "next/image";
import Contents from "./components/Contents";
import Content from "./components/Content";

export default function Home() {
  return (
    <Contents>
      <Content name="디시인사이드"/>
      <Content name="뽐뿌"/>
      <Content name="틱톡..?"/>
    </Contents>
  );
}
