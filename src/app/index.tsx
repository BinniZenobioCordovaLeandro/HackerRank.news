import {PATHS} from "@/constants/routes";
import {Redirect} from "expo-router";
import React from "react";

const HomeScreen = () => <Redirect href={PATHS.ARTICLES} />;

export default HomeScreen;
