"use client";

import { RecoilRoot } from "recoil";

export default function ReocilProvider({ children }: React.PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
