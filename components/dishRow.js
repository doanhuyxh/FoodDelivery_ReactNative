import {Image, Text, TouchableOpacity, View} from "react-native";
import Rect from "react";
import {themeColor} from "../themes";
import * as Icon from "react-native-feather";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, deleteFromCart, selectCartItemById} from "../slices/cartSlice";


export default function DishRow({item}) {

    const dispatch = useDispatch();
    const totalItems = useSelector(state => selectCartItemById(state, item.id))
    const handleDeIncrease = () => {
        dispatch(deleteFromCart({id: item.id}))
    }
    const handleIncrease = () => {
        dispatch(addToCart({...item}))
    }

    return (
        <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl shadow-gray-500 my-2 mx-2">
            <Image source={item.image} className="rounded-3xl" style={{width: 100, height: 100}}/>
            <View className="flex flex-1 space-y-3">
                <View className="pl-3">
                    <Text className="text-xl">{item.name}</Text>
                    <Text className="text-gray-700">{item.description}</Text>
                </View>
                <View className="flex-row justify-between pl-3 items-center">
                    <Text className="text-gray-700 text-lg font-bold">${item.price}</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            className="p-1 rounded-full"
                            style={{backgroundColor: themeColor.bgColor(1)}}
                            onPress={handleDeIncrease}
                            disabled={!totalItems.length}
                        >
                            <Icon.Minus strokeWidth={2} height={20} width={20} stroke={'white'}/>
                        </TouchableOpacity>
                        <Text className="px-3">{totalItems.length}</Text>
                        <TouchableOpacity
                            className="p-1 rounded-full"
                            style={{backgroundColor: themeColor.bgColor(1)}}
                            onPress={handleIncrease}
                        >
                            <Icon.Plus strokeWidth={2} height={20} width={20} stroke={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}