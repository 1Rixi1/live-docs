import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddNewDocumentBtn from "@/components/AddNewDocumentBtn";

const Home = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const documents = [];

  return (
    <main className={"home-container"}>
      <Header className={"sticky top-0 left-0"}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>

      {documents.length > 0 ? (
        <div></div>
      ) : (
        <div>
          <Image
            src="/assets/icons/doc.svg"
            alt={"doc"}
            width={32}
            height={32}
          />
          <AddNewDocumentBtn
            userId={user.id}
            email={user.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
