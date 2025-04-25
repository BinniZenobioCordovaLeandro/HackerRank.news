import BackgroundFetch from "react-native-background-fetch";
import {
    configureBackgroundFetch,
    onEvent,
    onTimeout,
} from "./hooks/useBackgroundFetch";
configureBackgroundFetch();

BackgroundFetch.registerHeadlessTask(async (event) => {
    const {taskId, timeout} = event;
    console.log(
        "🚀⭐️⭐️ [BackgroundFetch] Headless task event:",
        taskId,
        "timeout:",
        timeout
    );
    if (timeout) onTimeout(taskId);
    else onEvent(taskId);
});

import "expo-router/entry";
