"use client";

import React from "react";
import { RecoilRoot } from "recoil";

const RootProvider = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;

export default RootProvider;
