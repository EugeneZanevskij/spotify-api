import React from "react";

interface Props {
  className?: string;
  flexDirection?: string;
  alignItems?: string;
  maxWidth?: string;
  margin?: string;
  padding?: string;
  gap?: string;
  children?: React.ReactNode;
}
export const ItemWrapper: React.FC<Props> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};
