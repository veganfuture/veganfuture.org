"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  ClipboardIcon,
  ChatBubbleBottomCenterIcon,
  MapIcon,
  XMarkIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ComponentType, SVGProps } from "react";
import Image from "next/image";

type NavItem = {
  name: string;
  description: string;
  href: string;
};

type NavDropdown = {
  children: Array<NavItem & { icon: ComponentType<SVGProps<SVGSVGElement>> }>;
  name: string;
  description: string;
};

type TopLevelItem = NavItem | NavDropdown;

const isNavItem = (item: TopLevelItem): item is NavItem => {
  return item.hasOwnProperty("href");
};

const topLevelItems: Array<TopLevelItem> = [
  {
    name: "Home",
    description: "The most important reasons to go vegan in one page",
    href: "/",
  },
  {
    name: "Resources",
    description: "A list of resources for activists and new comers alike",
    children: [
      {
        name: "Social Experiment",
        description: "A script that we use for outreach",
        href: "/socialexperiment",
        icon: ClipboardIcon,
      },
      {
        name: "Vegan Map of Amsterdam",
        description: "Map of Amsterdam with all vegan restaurants",
        href: "/mapofamsterdam",
        icon: MapIcon,
      },
      {
        name: "Fact sheets",
        description: "Fact sheets for reference during outreach",
        href: "/factsheets",
        icon: ClipboardDocumentListIcon,
      },
      {
        name: "Outreach content",
        description: "All you need for doing outreach",
        href: "/content",
        icon: ClipboardDocumentListIcon,
      },
    ],
  },
  {
    name: "Events",
    description: "Events we host",
    children: [
      {
        name: "Agenda",
        description: "All upcoming events",
        href: "/agenda",
        icon: CalendarDaysIcon,
      },
      {
        name: "Street outreach",
        description: "Talking to people on the streets about veganism",
        href: "/street_outreach",
        icon: MegaphoneIcon,
      },
      {
        name: "RAAF",
        description: "Revolutionary Animal Advocacy Forum",
        href: "/raaf",
        icon: AcademicCapIcon,
      },
    ],
  },
  {
    name: "About us",
    description: "Learn about Vegan Future's organization",
    children: [
      {
        name: "Manifesto",
        description: "Explaination of our philosophy and regulations",
        href: "/manifesto",
        icon: ShieldCheckIcon,
      },
      {
        name: "Contact us",
        description: "Drop us a message!",
        href: "/contact",
        icon: ChatBubbleBottomCenterIcon,
      },
    ],
  },
];

type NavBarProps = {
  className: string;
};

export function Navbar({ className }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={className}>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Vegan Future</span>
            <Image
              alt="Vegan Future of Amsterdam"
              src="vf_logo_96.png"
              width={96}
              height={96}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {topLevelItems.map((item) =>
            isNavItem(item) ? (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 no-underline hover:text-indigo-600"
              >
                {item.name}
              </a>
            ) : (
              <Popover key={item.name} className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none text-gray-400"
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="p-4">
                    {item.children.map((childItem) => (
                      <div
                        key={childItem.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <childItem.icon
                            aria-hidden="true"
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          />
                        </div>
                        <div className="flex-auto">
                          <a
                            href={childItem.href}
                            className="block font-semibold text-gray-900 no-underline hover:text-indigo-600"
                          >
                            {childItem.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">
                            {childItem.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>
            ),
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Vegan Future</span>
              <Image
                alt="Vegan Future of Amsterdam"
                src="logo.png"
                className="h-16 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {topLevelItems.map((item) =>
                  isNavItem(item) ? (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 no-underline hover:text-indigo-600"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Disclosure key={item.name} as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {item.name}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {item.children.map((childItem) => (
                          <DisclosureButton
                            key={childItem.name}
                            as="a"
                            href={childItem.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            {childItem.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  ),
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
