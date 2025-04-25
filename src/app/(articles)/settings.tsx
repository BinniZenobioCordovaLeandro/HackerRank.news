import {Button} from "@/components/Button/Button";
import {Icon} from "@/components/Icon/Icon";
import {Text} from "@/components/Text/Text";
import {STRINGS} from "@/constants/strings";
import {useBackgroundFetch} from "@/hooks/useBackgroundFetch";
import {fetchArticlesTask} from "@/tasks";
import {theme} from "@/theme/colors";
import {RefreshControl, SectionList, View} from "react-native";

const SettingsScreen = () => {
    const {text: color, background: backgroundColor} = theme();
    const {tasksHistories, refresh, isLoading, clearHistory} =
        useBackgroundFetch();

    return (
        <SectionList
            refreshing={isLoading}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    title={STRINGS.loading}
                    tintColor={color}
                    titleColor={color}
                    progressBackgroundColor={backgroundColor}
                    onRefresh={refresh}
                />
            }
            sections={Object.entries(tasksHistories).map(
                ([taskId, taskHistory]) => ({
                    title: taskId,
                    data: taskHistory,
                })
            )}
            keyExtractor={(item) => item.timestamp}
            renderItem={({item}) => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                    }}
                >
                    <Text type="label">
                        {new Date(item.timestamp).toLocaleString()}
                    </Text>
                    <Text type="label">{item.status}</Text>
                </View>
            )}
            renderSectionHeader={({section: {title}}) => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                    }}
                >
                    <Text type="title">{title}</Text>
                    <Icon
                        name="trash-can"
                        size={40}
                        onPress={() => clearHistory(title)}
                    />
                </View>
            )}
            stickySectionHeadersEnabled
            ListFooterComponent={() => (
                <View>
                    <Button
                        title="Run Task"
                        onPress={() => {
                            fetchArticlesTask()
                                .then((status) => {
                                    console.log("Task status:", status);
                                })
                                .catch((error) => {
                                    console.error("Error running task:", error);
                                });
                        }}
                    />
                </View>
            )}
        />
    );
};

export default SettingsScreen;
