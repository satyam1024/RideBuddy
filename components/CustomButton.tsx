
import { TouchableOpacity ,Text} from "react-native";
import { ButtonProps} from "@/types/type";

const getBgVariantStyle=(variant:ButtonProps['bgVariant'])=>{
    switch(variant){
        case "secondary":
            return "bg-gray-500"
        case "danger":
            return "bg-red-500"
        case "success":
            return "bg-green-500"
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]";
        default:
            return "bg-[#0286FF]";
    }
}
const getTextVariantStyle=(variant:ButtonProps['textVariant'])=>{
    switch(variant){
        case "primary":
            return "text-black"
        case "danger":
            return "bg-red-100"
        case "success":
            return "bg-green-100"
        case "secondary":
            return "text-gray-100";
        default:
            return "";
    }
}


const CustomButton=({
    onPress,
    title,
    bgVariant="default",
    textVariant="default",
    IconLeft,
    IconRight,
    className,
    ...props
}:ButtonProps)=>{
    return(
    <TouchableOpacity onPress={onPress} 
    className={`flex  border-4 border-red-500 border-solid  rounded-full p-3 mb-2 flex-row justify-center item-center shadow-md  neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    {...props}>
        {IconLeft && <IconLeft/>}
        <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
            {title}
        </Text>
        {IconRight && <IconRight/>}

    </TouchableOpacity>
    )
}
export default CustomButton;