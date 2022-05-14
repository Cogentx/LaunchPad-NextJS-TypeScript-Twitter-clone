import React, { SVGProps } from 'react';

interface IProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}

export default function SidebarRow({ Icon, title }: IProps) {
  return (
    <div>
      <Icon className="h-10 w-10" />
      <p>{title}</p>
    </div>
  );
}
