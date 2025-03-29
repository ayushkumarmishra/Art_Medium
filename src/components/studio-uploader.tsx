import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";
import { UploadIcon } from "lucide-react";
import { Button } from "./ui/button";

interface StudioUploaderProps {
  endPoint?: string | null;
  onSuccess: () => void;
}

const UPLOADER_ID = "video-uploader";

export const StudioUploader = ({
  endPoint,
  onSuccess,
}: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader
        endpoint={endPoint}
        id={UPLOADER_ID}
        className="hidden group/uploader"
        onSuccess={onSuccess}
      />

      <MuxUploaderDrop muxUploader={UPLOADER_ID} className="group/drop">
        <div slot="heading" className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-2 rounded-full bg-muted h-32 w-32">
            <UploadIcon className="size-10 text-muted-foreground group/drop[&[active]]:animate-bounce transition-all duration-300" />
          </div>

          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm"> Drag and drop your Video files to upload</p>
            <p className="text-xs text-muted-foreground">
              Your videos will be private untill you publish them
            </p>
          </div>

          <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
            <Button type="button" className="rounded-full">
              Select Files
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <span slot="separator" className="hidden" />
      </MuxUploaderDrop>

      <MuxUploaderStatus
        muxUploader={UPLOADER_ID}
        className="text-sm flex flex-col justify-center text-center"
      />

      <MuxUploaderProgress
        muxUploader={UPLOADER_ID}
        className="text-sm"
        type="percentage"
      />

      <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar" />
    </div>
  );
};
