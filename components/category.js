import {ScrollView, Text, TouchableOpacity, View, Image} from "react-native";
import React, {useState} from "react";
import {categories} from "../constants";


export default function Category(){
    const [activeCategory, setActiveCategory] = useState(null)

    return(
        <View className="mt-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="overflow-visible"
                contentContainerStyle={{
                    paddingHorizontal:15
                }}
            >
                {
                    categories.map((category, index)=>{
                        let isActive = category.id === activeCategory
                        let btnClas = isActive ? "bg-gray-800": "bg-gray-200"
                        let textClass = isActive ? "text-gray-800": "text-gray-500"

                        return(
                            <View key={index} className="flex justify-center items-center mr-6">
                                <TouchableOpacity
                                    className={"p-1 rounded-full shadow bg-gray-200"+btnClas}
                                    onPress={()=>setActiveCategory(category.id)}
                                >
                                    <Image
                                        style={{width:45, height:45}}
                                        source={category.image}
                                    />
                                </TouchableOpacity>
                                <Text className={"text-sm"+textClass}>{category.name}</Text>

                            </View>
                        )
                    })
                }
            </ScrollView>

        </View>
    )
}