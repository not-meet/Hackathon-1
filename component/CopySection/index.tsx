import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from 'lucide-react';

// Define prop types
interface CopySectionProps {
  roomId: string;
}

// CopySection component
const CopySection: React.FC<CopySectionProps> = ({ roomId }) => {
  return (
    <div className="flex flex-col absolute text-white border border-white rounded p-2 left-7 bottom-24">
      <div className="text-base">Copy Room ID:</div>
      <hr className="my-1" />
      <div className="flex items-center text-sm">
        <span>{roomId}</span>
        <CopyToClipboard text={roomId}>
          <Copy className="ml-3 cursor-pointer" />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopySection;

