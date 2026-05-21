import ReactiveTitle from "@/components/ReactiveTitle";
import SkySparkles from "@/components/SkySparkles";
import MusicPlayer from "@/components/MusicPlayer";
import CustomCursor from "@/components/CustomCursor";
import ReactiveCloud from "@/components/ReactiveCloud";

export default function Home() {
  return (
    <main className="page">
      <MusicPlayer />
      <CustomCursor />
      <SkySparkles />

      <ReactiveTitle />

      <ReactiveCloud className="cloud-left" />
      <ReactiveCloud className="cloud-top" />
      <ReactiveCloud className="cloud-bottom" />

      <p className="footer">© PHILLIPE PHILLOPE 2026</p>
    </main>
  );
}