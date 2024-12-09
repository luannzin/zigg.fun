export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <strong className="text-6xl">zigg.fun</strong>
        <span className="font-roboto">
          developed with coffee, by{" "}
          <a
            href="https://github.com/luannzin"
            target="_blank"
            rel="noreferrer"
            className="text-amber-700 hover:text-amber-800"
          >
            luannzin
          </a>
        </span>
      </div>
    </div>
  );
}
