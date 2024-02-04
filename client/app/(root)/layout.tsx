import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Auth from "@/components/auth";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className={`container h-screen mx-auto max-w-7xl`}>
        <Auth />
      </div>
    );
  }
  return (
    <div className={`lg:container h-screen mx-auto lg:max-w-7xl`}>
      <div className={`flex`}>
        {/*<Sidebar />*/}
        <div
          className={`flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1`}
        >
          <div className={`w-full`}>
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            {children}
            <Toaster />
          </div>
        </div>
        {/*<FollowBar />*/}
      </div>
    </div>
  );
};

export default Layout;
