import React, { SVGProps } from 'react';

interface IProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}

export default function SidebarRow({ Icon, title }: IProps) {
  return (
    <div className="flex items-center px-3 py-4 space-x-2 rounded-full cursor-pointer hover:bg-gray-100 group">
      <Icon className="h-10 w-10" />
      <p className="group-hover:text-twitter">{title}</p>
    </div>
  );
}
