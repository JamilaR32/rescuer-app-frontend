import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { pastRequests } from "../../../api/requests";
import { Box, HStack, Heading, Spacer, VStack } from "native-base";

const History = () => {
  const { data } = useQuery({
    queryKey: ["history"],
    queryFn: () => pastRequests(),
  });
  console.log(data);
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        History
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              {/* <Avatar size="48px" source={{
        uri: item.avatarUrl
      }} /> */}
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.title}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.status}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.timestamps}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item._id}
      />
    </Box>
    // <View style={{ flex: 1 }}>
    //   <FlatList
    //     data={data}
    //     renderItem={({ item }) => <Text>{item.title}</Text>}
    //     key={(item) => item._id}
    //   />
    //   <Text>History</Text>
    // </View>
  );
};

export default History;
