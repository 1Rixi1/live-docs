import { useOthers } from "@liveblocks/react";
import Image from "next/image";

const ActiveUsers = () => {
  const otherUsers = useOthers();

  const usersInfo = otherUsers.map((user) => user.info);

  return (
    <ul className="collaborative-list">
      {usersInfo.map(({ id, name, avatar, color }) => (
        <li key={id}>
          <Image
            className="inline-block size-8 rounded-full ring-2 ring-dark-100"
            style={{ border: `3px solid ${color}` }}
            src={avatar}
            alt={name}
            width={100}
            height={100}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveUsers;
