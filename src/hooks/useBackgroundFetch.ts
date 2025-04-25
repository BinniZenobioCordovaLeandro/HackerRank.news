import {fetchArticlesTask} from "@/tasks";
import {Storage} from "@/utils/storage";
import {useCallback, useEffect, useState} from "react";
import BackgroundFetch, {type TaskConfig} from "react-native-background-fetch";

export enum TASK_STATE {
    STARTED = "started",
    SUCCESS = "success",
    ERROR = "error",
    NO_DATA = "no_data",
    STOPPED = "stopped",
}

const SCHEDULE_TASK: Record<string, () => Promise<TASK_STATE>> = {
    "com.hackernews.fetch-articles": fetchArticlesTask,
    "com.hackernews.fetch-articles-CLONE": fetchArticlesTask,
};

const BACKGROUND_FETCH_INTERVAL_MINUTES = 5;
const TASK_DELAY_MILISECONDS = 1000 * 5;

const SCHEDULE_TASK_CONFIG: Omit<TaskConfig, "taskId"> = {
    delay: TASK_DELAY_MILISECONDS,
    periodic: true,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
    forceAlarmManager: true,
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
};

export type TaskHistory = {
    taskId: string;
    timestamp: string;
    status: TASK_STATE;
};

export const joinTaskHistory = async (taskId: string, status: TASK_STATE) => {
    const history = await Storage.getItem(taskId);
    const parsedHistory = history ? JSON.parse(history) : [];
    const newHistory: TaskHistory[] = [
        ...parsedHistory,
        {
            taskId,
            timestamp: new Date().toISOString(),
            status,
        },
    ];
    await Storage.setItem(taskId, JSON.stringify(newHistory));
};

export const clearTaskHistory = async (taskId: string) => {
    await Storage.removeItem(taskId);
};

export const onEvent = async (taskId: string) => {
    const taskFn = SCHEDULE_TASK[taskId];
    if (taskFn) {
        console.log("🚀🎸🎸 [BackgroundFetch] Executing task:", taskId);
        const result = await taskFn();
        await joinTaskHistory(taskId, result);
    } else {
        console.log("🚀🎸🎸 [BackgroundFetch] Unknown taskId:", taskId);
        await BackgroundFetch.stop(taskId);
    }
    BackgroundFetch.finish(taskId);
    console.log("🚀🎸🎸 [BackgroundFetch] Finished task:", taskId);
};

export const onTimeout = async (taskId: string) => {
    console.log("🚀⏲️⏲️ [BackgroundFetch] TIMEOUT:", taskId);
    BackgroundFetch.finish(taskId);
};

export const configureBackgroundFetch = async () => {
    const status = await BackgroundFetch.status();
    if (status !== BackgroundFetch.STATUS_AVAILABLE) {
        console.log("🚀🔻🔻 [BackgroundFetch] Not available:", status);
        return;
    }

    await BackgroundFetch.configure(
        {
            minimumFetchInterval: BACKGROUND_FETCH_INTERVAL_MINUTES,
            ...SCHEDULE_TASK_CONFIG,
        },
        onEvent,
        onTimeout
    );

    for (const taskId of Object.keys(SCHEDULE_TASK)) {
        try {
            await BackgroundFetch.scheduleTask({
                taskId,
                ...SCHEDULE_TASK_CONFIG,
            });
        } catch (error) {
            console.error(
                `🚀🔻🔻 [BackgroundFetch] Failed to schedule ${taskId}:`,
                error
            );
        }
    }
    console.log("🚀⛳️⛳️ [BackgroundFetch] Configured successfully");
};

export const useBackgroundFetch = () => {
    const [tasksHistories, setTasksHistories] = useState<
        Record<string, TaskHistory[]>
    >({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchTaskHistories = useCallback(async () => {
        setIsLoading(true);
        try {
            const tasks = Object.keys(SCHEDULE_TASK);
            const histories: Record<string, TaskHistory[]> = {};
            for (const taskId of tasks) {
                const history = await Storage.getItem(taskId);
                histories[taskId] = history ? JSON.parse(history) : [];
            }
            setTasksHistories(histories);
        } catch (error) {
            console.error(
                "🚀🚀🚀 [BackgroundFetch] Failed to fetch histories:",
                error
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearHistory = useCallback(
        async (taskId: string) => {
            try {
                await clearTaskHistory(taskId);
                await fetchTaskHistories();
            } catch (error) {
                console.error(
                    `🚀🚀🚀 [BackgroundFetch] Failed to clear history for ${taskId}:`,
                    error
                );
            }
        },
        [fetchTaskHistories]
    );

    useEffect(() => {
        fetchTaskHistories();
    }, [fetchTaskHistories]);

    const refresh = useCallback(() => {
        fetchTaskHistories();
    }, [fetchTaskHistories]);

    return {
        tasksHistories,
        isLoading,
        refresh,
        clearHistory,
    };
};
