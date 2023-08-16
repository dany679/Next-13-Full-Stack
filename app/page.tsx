import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powred prompts </span>
      </h1>
      <p className="desc text-center">
        Next.js recently became the official React framework as outlined in
        React docs. This project is promtopia is an open source AI promptong
        tool for create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
