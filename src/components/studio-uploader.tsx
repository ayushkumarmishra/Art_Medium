import MuxUploader, { MuxUploaderDrop } from "@mux/mux-uploader-react";

interface StudioUploaderProps {
  endPoint?: string | null;
  onSuccess: () => void;
}

export const StudioUploader = ({
  endPoint,
  onSuccess,
}: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader endpoint={endPoint} />
    </div>
  );
};
