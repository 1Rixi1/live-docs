export type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};



export type UserType = "creator" | "editor" | "viewer";

export type CreateDocumentType = {
  userId: string;
  email: string;
};

type RoomType = ["room:write"] | ["room:read", "room:presence:write"];

export type UsersAccessesType = Record<string, RoomType>;
