import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import AddDocumentButton from "@/components/AddDocumentButton";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const userdata = await currentUser();

  if (!userdata) redirect("/sign-in");

  const documents = [];

  return (
    <main className="home-container">
      <Header className={"sticky top-0 left-0"}>
        <div className={"flex items-center gap-2 lg:gap-4"}>
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.length > 0 ? (
        <div></div>
      ) : (
        <div className={"documents-list-empty"}>
          <Image
            className="mx-auto"
            src="/assets/icons/doc.svg"
            alt="doc"
            width={40}
            height={40}
          />
          <AddDocumentButton
            userId={userdata.id}
            email={userdata.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home
