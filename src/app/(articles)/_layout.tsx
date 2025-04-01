import {TabButton} from "@/components/TabButton/TabButton";
import {PATHS} from "@/constants/routes";
import {useBackgroundFetch} from "@/hooks/useBackgroundFetch";
import {useNotifications} from "@/hooks/useNotification";
import {TabList, TabSlot, TabTrigger, Tabs} from "expo-router/ui";

const tabsLayout = () => {
    useNotifications();
    useBackgroundFetch();

    return (
        <Tabs>
            <TabSlot />
            <TabList>
                <TabTrigger name="home" href={PATHS.HOME as string} asChild>
                    <TabButton icon="home">News</TabButton>
                </TabTrigger>
                <TabTrigger
                    name="favorites"
                    href={PATHS.FAVORITES as string}
                    asChild
                >
                    <TabButton icon="heart">Favorites</TabButton>
                </TabTrigger>
                <TabTrigger
                    name="deleted"
                    href={PATHS.DELETED as string}
                    asChild
                >
                    <TabButton icon="trash-can">Deleted</TabButton>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
};

export default tabsLayout;
