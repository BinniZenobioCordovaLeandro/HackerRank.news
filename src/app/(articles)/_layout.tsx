import {TabButton} from "@/components/TabButton/TabButton";
import {PATHS} from "@/constants/routes";
import {TabList, TabSlot, TabTrigger, Tabs} from "expo-router/ui";

const tabsLayout = () => {
    return (
        <Tabs>
            <TabSlot />
            <TabList>
                <TabTrigger name="home" href={PATHS.HOME} asChild>
                    <TabButton icon="home">News</TabButton>
                </TabTrigger>
                <TabTrigger name="favorites" href={PATHS.FAVORITES} asChild>
                    <TabButton icon="heart">Favorites</TabButton>
                </TabTrigger>
                <TabTrigger name="deleted" href={PATHS.DELETED} asChild>
                    <TabButton icon="trash-can">Deleted</TabButton>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
};

export default tabsLayout;
