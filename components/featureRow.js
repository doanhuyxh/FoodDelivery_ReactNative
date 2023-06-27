import {ScrollView, Text, TouchableOpacity, View} from "react-native"
import Rect from 'react'
import {themeColor} from "../themes";
import RestaurantCard from "./restaurantCard";



export default function FeatureRow({id, title, description, restaurants}) {
    return (
        <View>
            <View className="flex-row justify-between items-center px-4">
                <View>
                    <Text className="font-bold text-lg">{title}</Text>
                    <Text className="text-gray-500 text-xs">{description}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{color: themeColor.text}}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal:15
                }}
                className="overflow-visible py-5"
            >
                {
                    restaurants.map((restaurant, index)=>{
                        return(
                            <RestaurantCard
                                item={restaurant}
                                key={index}
                            />
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

