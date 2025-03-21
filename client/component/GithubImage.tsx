import Link from "next/link";

export default function GithubImage() {
  return (
    <>
      <Link
        href="https://github.com/jonas-soderholm/nest-next-auth"
        target="_blank"
      >
        <div
          className="absolute inset-0 flex justify-center items-center
  mt-[600px] md:mt-[850px] lg:mt-[900px] xl:mt-[1000px]"
        >
          <img
            src="/images/vscode.png"
            alt="VSCode Image"
            className="w-3/4 hover:w-10/12 hover:cursor-pointer transition-width duration-300 ease-in-out"
          />
        </div>
      </Link>
    </>
  );
}
