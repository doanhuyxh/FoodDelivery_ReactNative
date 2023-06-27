import {Text, TouchableOpacity, View} from "react-native";
import Rect from "react";
import {themeColor} from "../themes";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../slices/cartSlice";

export default function CartIcon() {
    const navigation = useNavigation();
    const cartItem = useSelector(selectCartItems);
    const cartTotal  = useSelector(selectCartTotal);
    if (!cartItem.length) {
        return (
            <View></View>
        )
    }
    return (
        <View className="absolute bottom-0 w-full z-50">
            <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{backgroundColor: themeColor.bgColor(1)}}
                className="flex-row justify-between items-center mx-5 rounded-full p-4 px-3 shadow-lg">
                <View className="p-2 px-4 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
                    <Text className="font-extrabold text-white text-lg">{cartItem.length}</Text>
                </View>
                <Text className="flex-1 text-center font-extrabold text-white text-lg">View Cart</Text>
                <Text className="font-extrabold text-white text-lg">${cartTotal}</Text>
            </TouchableOpacity>
        </View>
    )
}