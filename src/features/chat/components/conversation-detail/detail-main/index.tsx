import { Messages } from "./message";
import { NewMessageInput } from "./new-message-input";

export const DetailMain = () => {
  return (
    <div className="flex h-full flex-col justify-end gap-4 px-8 py-4">
      <Messages />
      <NewMessageInput />
    </div>
  );
};
