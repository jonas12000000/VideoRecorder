import Header from "@/components/Header";

const Page = async ({params } : ParamsWithSearch) => {
    const { id } = await params;

  return (
    <div className="wrapper page">
        <Header subHeader="jonas@gmail.com" title="React Developer" userImg="/assets/images/dummy.jpg" />
      <h1 className="text-2xl font-karla">User id: {id}</h1>
    </div>
  );
}

export default Page