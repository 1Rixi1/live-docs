import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddNewDocumentBtn from "@/components/AddNewDocumentBtn";
import { getAllDocuments } from "@/lib/acions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";

const Home = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const documents = await getAllDocuments(user.emailAddresses[0].emailAddress);

  return (
    <main className={"home-container"}>
      <Header className={"sticky top-0 left-0"}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>

      {documents.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <p className="text-28-semibold">All documents</p>
            <AddNewDocumentBtn
              userId={user.id}
              email={user.emailAddresses[0].emailAddress}
            />
          </div>

          <ul className="document-ul">
            {documents.data.map(({ id, metadata, createdAt }: any) => (
              <li className="document-list-item" key={id}>
                <Link
                  className={"flex items-center gap-5"}
                  href={`/documents/${id}`}
                >
                  <Image
                    src={"/assets/icons/doc.svg"}
                    alt="doc"
                    width={40}
                    height={40}
                  />
                  <div className="space-y-1">
                    <p className={"line-clamp-1 text-lg"}>{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">
                      Created about {dateConverter(createdAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/assets/icons/doc.svg"
            alt={"doc"}
            width={50}
            height={50}
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
