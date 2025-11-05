import VideoDetailHeader from "@/components/VideoDetailHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { getVideoById } from "@/lib/actions/video";
import { redirect } from "next/navigation";



const Page = async ({ params }: Params) => {
  const { videoId } = await params;
  
  const { videos, user } = await getVideoById(videoId);
  console.log(videos);
  
  if (!videos) redirect("/404");
  
  return (
    <main className='wrapper page'>
      <VideoDetailHeader {...videos} userImg={user?.image} username={user?.name} ownerId={videos.userId} id={videos.id} />
      <section className="video-details">
        <div className="content">
          <VideoPlayer videoId={videos.videoId} />
        </div>
      </section>
    </main>
  );
}

export default Page