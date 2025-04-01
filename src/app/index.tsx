import {PATHS} from "@/constants/routes";
import {Redirect} from "expo-router";
import React from "react";

const HomeScreen = () => <Redirect href={PATHS.ONBOARDING} />;

export default HomeScreen;
