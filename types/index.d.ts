export type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export type DocumentProps = {
  params: { id: string };
};

type MetadataCollaborativeRoomType = {
  creatorId: string;
  email: string;
  title: string;
};

export type CollaborativeRoomProps = {
  roomId: string;
  metadata: MetadataCollaborativeRoomType;
  usersData: UsersDataType;
  currentUserData: UserType;
};

export type AddNewDocumentBtnProps = {
  userId: string;
  email: string;
};

export type UsersDataType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userType?: string;
};

export type UserType = "creator" | "editor" | "viewer";

type AccessesType = ["room:write"] | ["room:read", "room:presence:write"];

export type UsersAccessesType = Record<string, AccessesType>;
