import { Tree } from "@/components/Tree";
import { ITEMS_TO_CREATE } from "@/data/itemsToCreate";

export default function Home() {
  const onClickCreateItems = () => {
    console.log(ITEMS_TO_CREATE);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 30,
      }}
    >
      <button onClick={onClickCreateItems}>Visualize and Create items</button>

      {/**
       * tree visualization
       */}
      <Tree.Container>
        <Tree.Item depth={0}>Hello</Tree.Item>
        <Tree.Item depth={1}>world</Tree.Item>
        <Tree.Item depth={2}>tree</Tree.Item>
        <Tree.Item depth={3}>file2.mp4</Tree.Item>
        <Tree.Item depth={2}>file2.mp4</Tree.Item>
        <Tree.Item depth={1}>folder</Tree.Item>
        <Tree.Item depth={2}>file2.mp4</Tree.Item>
      </Tree.Container>
    </div>
  );
}
