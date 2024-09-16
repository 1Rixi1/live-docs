import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserSelectorTypeProps, UserType } from "@/types";

const UserSelector = ({
  userType,
  setUserType,
  onCLickHandler,
}: UserSelectorTypeProps) => {
  const onValueChange = (type: UserType) => {
    setUserType(type);
    onCLickHandler && onCLickHandler(type)
  };

  return (
    <Select value={userType} onValueChange={onValueChange}>
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className=" border-none bg-dark-200">
        <SelectItem className="shad-select-item" value="viewer">
          Может просматривать
        </SelectItem>
        <SelectItem className="shad-select-item" value="editor">
          Может Изменять
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserSelector;
