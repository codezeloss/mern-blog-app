const Post = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mb-8 items-center">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2023/04/IMG_9059.jpg?w=1390&crop=1"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>
          ChatGPT resumes service in Italy after adding privacy disclosures and
          controls
        </h2>
        <p className="my-2 mx-0 text-[#888] text-xs font-bold flex gap-3">
          <a className="text-[#333]">Dawid Ali</a>
          <time>2023-04-29 14:45</time>
        </p>
        <p className="my-3 mx-0 leading-6">
          A few days after OpenAI announced a set of privacy controls for its
          generative AI chatbot, ChatGPT, the service has been made available
          again to users in Italy — resolving (for now) an early regulatory
          suspension in one of the European Union’s 27 Member States, even as a
          local probe of its compliance with the region’s data protection rules
          continues.
        </p>
      </div>
    </div>
  );
};

export default Post;
