import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatPage = () => {
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="flex items-center justify-center h-[calc(100vh-180px)] px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-500 animate-pulse">
            Coming Soon...
          </h1>
        </div>
      </ScrollArea>
    </div>
  );
};
