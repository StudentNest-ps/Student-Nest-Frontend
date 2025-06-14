'use client';

import * as React from 'react';
import {
  IconCamera,
  IconFileAi,
  IconFileDescription,
  IconUsers,
  IconBuilding,
  IconShieldPlus,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useAuth } from '@/context/Auth';
import { Role } from '@/module/@types';
import { LayoutDashboard } from 'lucide-react';

const adminTabs = [
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: IconUsers,
  },
  {
    title: 'Properties',
    url: '/dashboard/properties',
    icon: IconBuilding,
  },
  {
    title: 'Accounts',
    url: '/dashboard/accounts',
    icon: IconShieldPlus,
  },
];

const ownerTabs = [
  {
    title: 'Properties',
    url: '/dashboard-owner/properties',
    icon: IconBuilding,
  },
  {
    title: 'Bookings',
    url: '/dashboard-owner/bookings',
    icon: IconShieldPlus,
  },
];

const data = {
  navMain: [
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: IconUsers,
    },
    {
      title: 'Properties',
      url: '/dashboard/properties',
      icon: IconBuilding,
    },
    {
      title: 'Accounts',
      url: '/dashboard/accounts',
      icon: IconShieldPlus,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link
                href={
                  user?.role === Role.ADMIN ? '/dashboard' : '/dashboard-owner'
                }
              >
                <LayoutDashboard className="!size-5" />
                <span className="text-base font-semibold">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            user?.role === Role.ADMIN ? adminTabs : ownerTabs || data.navMain
          }
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
