"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import { Icons } from "@/components/icons";

type OAuthProvider = {
  name: Provider;
  icon: keyof typeof Icons;
};

const providers: OAuthProvider[] = [
  {
    name: "google",
    icon: "google",
  },
  {
    name: "github",
    icon: "github",
  },
];

export const OAuthProviders: React.FC = () => {
  const supabase = createClient();

  const handleLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/chat`,
      },
    });
    if (error) {
      console.error("OAuth error", error);
    }
  };

  return (
    <>
      {providers.map((provider) => {
        const Icon = Icons[provider.icon ?? "google"];
        return (
          <Button
            key={provider.name}
            variant="outline"
            className="mb-2 w-full font-normal text-muted-foreground"
            onClick={() => handleLogin(provider.name)}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <p>
                Sign in with{" "}
                {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
              </p>
            </div>
          </Button>
        );
      })}
    </>
  );
};
