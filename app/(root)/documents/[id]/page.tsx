import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <Header>
        <div className="flex items-center justify-center w-fit gap-2">
          <p className="document-title">Share</p>
        </div>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <Editor />
    </div>
  );
};

export default Page;
