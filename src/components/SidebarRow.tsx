import React, { SVGProps } from 'react';

interface IProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}

export default function SidebarRow({ Icon, title }: IProps) {
  return (
    <div className="flex max-w-fit items-center px-4 py-3 space-x-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 group">
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter">{title}</p>
    </div>
  );
}
