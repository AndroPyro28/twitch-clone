import { Loader } from "lucide-react";

interface OfflineVideoProps {
  label: string;
}

export const LoadingVideo: React.FC<OfflineVideoProps> = ({ label }) => {
  return (
    <div className="h-full flex flex-col  space-y-4  justify-center items-center">
      <Loader className="size-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground capitalize"> {label} </p>
    </div>
  );
};
