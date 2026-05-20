import CustomCursor from "@/components/CustomCursor";
import ReactiveCloud from "@/components/ReactiveCloud";

export default function Home() {
  return (
    <main className="page">
      <CustomCursor />

      <h1 className="brand">
        <span>P</span>
        <span>H</span>
        <span>I</span>
        <span>L</span>
        <span>L</span>
        <span>I</span>
        <span>P</span>
        <span>E</span>
        <span>&nbsp;</span>
        <span>P</span>
        <span>H</span>
        <span>I</span>
        <span>L</span>
        <span>L</span>
        <span>O</span>
        <span>P</span>
        <span>E</span>
      </h1>

      <ReactiveCloud className="cloud-left" />
      <ReactiveCloud className="cloud-top" />
      <ReactiveCloud className="cloud-bottom" />

      <p className="footer">© PHILLIPE PHILLOPE 2026</p>
    </main>
  );
}